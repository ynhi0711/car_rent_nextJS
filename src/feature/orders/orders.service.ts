import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import * as constant from '../../common/constant';
import Car from 'src/feature/car/entities/car.entity';
import { APIException } from 'src/common/exception/api_exception';
import Order from 'src/feature/orders/entities/order.entity';
import { Sequelize, Transaction } from 'sequelize';
import OrderStatus, {
  OrderStatusEnum,
} from 'src/feature/orders/entities/order_status.entity';
import Payment from 'src/feature/orders/entities/payment.entity';
import { CarStatus, Status } from 'src/feature/car/entities/status.entity';
import { Price } from 'src/feature/car/entities/prices.entity';
import PaymentStatus, {
  PaymentStatusEnum,
} from 'src/feature/orders/entities/payment_status.entity';
import PaymentMethod, {
  PaymentMethodEnum,
} from 'src/feature/orders/entities/paymnet_method.entity';
import { Type } from 'src/feature/car/entities/types.entity';
import User from 'src/feature/users/entities/user.entity';
import { Steering } from 'src/feature/car/entities/steerings.entity';
import { OrderResponseDto } from './dto/order_response.dto';
import { UserRole } from 'src/feature/users/entities/user_role.entity';
import { PagingDto } from 'src/common/paging.dto';
import Coupon, { CouponEnum } from './entities/coupon.entity';
import { QueueService } from 'src/common/queues/queues.service';
import { Image } from 'src/feature/car/entities/images.entity';
import { Op } from 'sequelize';
import * as moment from 'moment';
import { randomInt } from 'crypto';
@Injectable()
export class OrdersService {
  constructor(
    @Inject(constant.CARS_REPOSITORY)
    private carRepository: typeof Car,

    @Inject(constant.ORDERS_REPOSITORY)
    private orderRepository: typeof Order,

    @Inject(constant.COUPONS_REPOSITORY)
    private couponRepository: typeof Coupon,

    @Inject(constant.USERS_REPOSITORY)
    private userRepository: typeof User,

    @Inject(constant.SEQUELIZE)
    private sequelize: Sequelize,
    private readonly queueService: QueueService,

  ) { }

  async calculatePrice(createOrderDto: CreateOrderDto) {
    const car = await this.carRepository.findOne({
      where: {
        id: createOrderDto.car_id,
      },
      include: Price,
    });
    if (!car) {
      throw APIException.throwException(HttpStatus.NOT_FOUND, {
        title: `car_id ${createOrderDto.car_id} is not found`,
      });
    }

    let price = car.price[car.price.length - 1]?.price;
    if (!price) {
      throw APIException.throwException(HttpStatus.NOT_FOUND, {
        title: `car_id ${createOrderDto.car_id} is not found`,
      });
    }
    let coupon: Coupon
    if (createOrderDto.coupon_code) {
      coupon = await this.couponRepository.findOne({
        where: {
          code: createOrderDto.coupon_code,
        },
      });

    }
    const totalPrice = await this.getTotalPriceByDate(createOrderDto.pick_up_date, createOrderDto.drop_off_date, price, coupon)
    return { coupon_code: createOrderDto.coupon_code, total_rental_price: totalPrice };
  }

  async getTotalPriceByDate(pickup: Date, dropoff: Date, price: number, coupon: Coupon) {
    let pickUpDate = moment(pickup)
    let dropoffDate = moment(dropoff)
    let numberOfDays = dropoffDate.diff(pickUpDate, 'days') + 1;
    let totalPriceByDays = price * numberOfDays

    if (coupon) {
      if (coupon.coupon_type_id === CouponEnum.Percentage) {
        totalPriceByDays = totalPriceByDays - (totalPriceByDays * coupon.discount_value) / 100;
      } else if (coupon.coupon_type_id === CouponEnum.FixedAmount) {
        totalPriceByDays = totalPriceByDays - coupon.discount_value;
      }

    }
    return totalPriceByDays
  }

  async checkCarAvailableForRent(createOrderDto: CreateOrderDto) {
    // Check car status != UNAVAILABLE ===> false

    // Check if exists an order rented this car_id , !isExists  ===> true

    // Check if order.status == Picked ===> false

    // Check order.end_date < input.start_date || order.start_date > input.end_date

    const pickupDateUtc = moment(createOrderDto.pick_up_date).utc(false).format('YYYY-MM-DD HH:mm:ss');
    const dropoffDateUtc = moment(createOrderDto.drop_off_date).utc(false).format('YYYY-MM-DD HH:mm:ss');

    let car = await this.carRepository.findOne({
      where: { id: createOrderDto.car_id },
    });
    if (!car) {
      throw APIException.throwException(HttpStatus.NOT_FOUND, {
        title: `car_id ${createOrderDto.car_id} is not found`,
      });
    } else if (car.status_id == CarStatus.unavailable) {
      return false;
    }

    let carAvailable = await this.carRepository.findOne({
      attributes: ['id'],
      where: {
        [Op.and]: [
          { id: createOrderDto.car_id },
          {
            id: {
              [Op.notIn]: [
                Sequelize.literal(`(SELECT car_id from Orders WHERE Orders.order_status_id = ${OrderStatusEnum.Booked} AND
               (('${pickupDateUtc}' BETWEEN Orders.pick_up_date AND Orders.drop_off_date)
              OR ('${dropoffDateUtc}' BETWEEN Orders.pick_up_date AND Orders.drop_off_date)
              OR (Orders.pick_up_date BETWEEN '${pickupDateUtc}' AND '${dropoffDateUtc}')
              OR (Orders.drop_off_date BETWEEN '${pickupDateUtc}' AND '${dropoffDateUtc}')))`),
              ],
            },
          }
        ]

      },

    });
    if (carAvailable) return true;
  }

  async placeOrder(userId: number, createPlaceOrderDto: CreateOrderDto) {
    //Block this carID while placing an order
    const t = await this.sequelize.transaction();
    try {
      let car = await this.carRepository.findOne({
        include: [Type, Price],
        where: { id: createPlaceOrderDto.car_id },
        lock: t.LOCK.UPDATE,
        transaction: t
      });

      if (await this.checkCarAvailableForRent(createPlaceOrderDto)) {
        const orderModel = {
          user_id: userId,
          car_id: createPlaceOrderDto.car_id,
          drop_off_date: createPlaceOrderDto.drop_off_date,
          drop_off_location: createPlaceOrderDto.drop_off_location,
          pick_up_date: createPlaceOrderDto.pick_up_date,
          pick_up_location: createPlaceOrderDto.pick_up_location,
          order_status_id: OrderStatusEnum.Booked
        }
        const order = await Order.create(orderModel, { transaction: t });

        const paymentModel = new Payment();
        paymentModel.order_id = order.id;
        paymentModel.user_id = userId;
        paymentModel.payment_status_id = PaymentStatusEnum.Pending;
        paymentModel.payment_method_id = PaymentMethodEnum.Cash;

        let price = car.price[car.price.length - 1]?.price;
        let coupon: Coupon

        if (createPlaceOrderDto.coupon_code) {
          coupon = await this.couponRepository.findOne({
            where: {
              code: createPlaceOrderDto.coupon_code,
            },
          });
          if (coupon) {
            paymentModel.coupon_id = coupon.id;
          }
        }
        paymentModel.price = await this.getTotalPriceByDate(createPlaceOrderDto.pick_up_date, createPlaceOrderDto.drop_off_date, price, coupon);
        const payment = await paymentModel.save({ transaction: t });

        const user = await this.userRepository.findByPk(userId, {
          transaction: t,
        });

        this.queueService.sendPlaceOrderMail(
          user.email,
          user.name,
          `${car.name} - ${car.type?.name}`,
          order.pick_up_date.toString(),
          order.drop_off_date.toString(),
          price,
          PaymentMethodEnum[1],
        );
        await t.commit();
        return { order_id: order.id, payment_id: payment.id };
      } else {
        throw APIException.throwException(HttpStatus.BAD_REQUEST, {
          message: `car_id ${createPlaceOrderDto.car_id} is not available`,
        });
      }
    } catch (error) {
      await t.rollback();
      if (typeof error?.original?.code !== 'undefined') {
        throw APIException.throwException(HttpStatus.BAD_REQUEST, {
          message: error?.original?.sqlMessage,
        });
      } else {
        throw error;
      }
    }
  }

  async getOrderById(id: number): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      include: [
        {
          model: Payment,
          include: [PaymentMethod, PaymentStatus, this.couponRepository],
        },
        {
          model: Car,
          include: [Type, Price, Status, Steering],
        },
        {
          model: User,
          include: [UserRole],
        },
        {
          model: OrderStatus,
        },
      ],
      where: {
        id: id,
      },
    });
    if (order) return new OrderResponseDto(order);

    throw APIException.throwException(HttpStatus.NOT_FOUND, {
      title: `order_id ${id} is not found`,
    });
  }

  async findAll(limit: number, offset: number) {
    const result = await this.orderRepository.findAndCountAll({
      include: [Payment],
      limit: Number(limit),
      offset: Number(offset),
    });
    return new PagingDto(
      result.rows,
      result.count,
      Number(limit),
      Number(offset),
    );
  }
}
