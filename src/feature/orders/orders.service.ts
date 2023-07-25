import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import * as constant from '../../common/constant';
import Car from 'src/feature/car/entities/car.entity';
import { APIException } from 'src/exception/api_exception';
import Order from 'src/feature/orders/entities/order.entity';
import { Sequelize } from 'sequelize';
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
  ) {}

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
    let coupon: Coupon;
    if (createOrderDto.coupon_code) {
      coupon = await this.couponRepository.findOne({
        where: {
          code: createOrderDto.coupon_code,
        },
      });
      if (coupon) {
        if (coupon.coupon_type_id === CouponEnum.Percentage) {
          price = price - (price * coupon.discount_value) / 100;
        } else if (coupon.coupon_type_id === CouponEnum.FixedAmount) {
          price = price - coupon.discount_value;
        }
      }
    }
    return { coupon, total_rental_price: price };
  }

  async checkCarAvailableToRent(createOrderDto: CreateOrderDto) {
    // Check car status != UNAVAILABLE ===> false

    // Check if exists an order rented this car_id , !isExists  ===> true

    // Check if order.status == Picked ===> false

    // Check order.end_date < input.start_date || order.start_date > input.end_date

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
    const currentCar = await this.orderRepository.findOne({
      where: { car_id: createOrderDto.car_id },
    });
    if (!currentCar) {
      return true;
    }

    const literalValue = Sequelize.literal(`(SELECT COUNT(*) FROM orders 
      WHERE (('${createOrderDto.pick_up_date}' BETWEEN orders.pick_up_date AND orders.drop_off_date) 
      OR ('${createOrderDto.drop_off_date}' BETWEEN orders.pick_up_date AND orders.drop_off_date) 
      OR (orders.pick_up_date BETWEEN '${createOrderDto.pick_up_date}' AND '${createOrderDto.drop_off_date}') 
      OR (orders.drop_off_date BETWEEN '${createOrderDto.pick_up_date}' AND '${createOrderDto.drop_off_date}')) 
      and orders.order_status_id = ${OrderStatusEnum.Booked}) = 0`);

    return !!(await this.carRepository.findOne({
      include: [
        {
          model: Order,
          required: true,
          include: [
            {
              model: Payment,
              required: true,
              where: {
                literalValue,
              },
            },
          ],
        },
      ],
      where: {
        id: createOrderDto.car_id,
      },
    }));
  }

  async placeOrder(userId: number, createPlaceOrderDto: CreateOrderDto) {
    const t = await this.sequelize.transaction();
    try {
      if (await this.checkCarAvailableToRent(createPlaceOrderDto)) {
        const rawOrder = new Order();
        rawOrder.user_id = userId;
        rawOrder.car_id = createPlaceOrderDto.car_id;
        rawOrder.drop_off_date = createPlaceOrderDto.drop_off_date;
        rawOrder.drop_off_location = createPlaceOrderDto.drop_off_location;
        rawOrder.pick_up_date = createPlaceOrderDto.pick_up_date;
        rawOrder.pick_up_location = createPlaceOrderDto.pick_up_location;
        rawOrder.order_status_id = OrderStatusEnum.Booked;
        const order = await rawOrder.save({ transaction: t });

        const rawPayment = new Payment();
        rawPayment.order_id = order.id;
        rawPayment.user_id = userId;
        rawPayment.payment_status_id = PaymentStatusEnum.Pending;
        rawPayment.payment_method_id = PaymentMethodEnum.Cash;

        const car = await this.carRepository.findOne({
          include: [Type, Price],
          where: {
            id: createPlaceOrderDto.car_id,
          },
          transaction: t,
        });
        let price = car.price[car.price.length - 1]?.price;

        if (createPlaceOrderDto.coupon_code) {
          const coupon = await this.couponRepository.findOne({
            where: {
              code: createPlaceOrderDto.coupon_code,
            },
          });
          if (coupon) {
            if (coupon.id === CouponEnum.Percentage) {
              price = price - (price * coupon.discount_value) / 100;
            } else if (coupon.id === CouponEnum.FixedAmount) {
              price = price - coupon.discount_value;
            }
            rawPayment.coupon_id = coupon.id;
          }
        }
        rawPayment.price = price;
        const payment = await rawPayment.save({ transaction: t });

        const user = await this.userRepository.findByPk(userId, {
          transaction: t,
        });

        await t.commit();
        return { order_id: order.id, payment_id: payment.id };
      } else {
        throw APIException.throwException(HttpStatus.BAD_REQUEST, {
          message: `car_id ${createPlaceOrderDto.car_id} is not available`,
        });
      }
    } catch (error) {
      await t.rollback();
      if (
        typeof error?.original?.code !== 'undefined' &&
        error.original.code === 'ER_NO_REFERENCED_ROW_2'
      ) {
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
