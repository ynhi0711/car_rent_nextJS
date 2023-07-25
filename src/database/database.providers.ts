import { Sequelize } from 'sequelize-typescript';
import { Car } from 'src/feature/car/entities/car.entity';
import { Image } from 'src/feature/car/entities/images.entity';
import * as constant from '../common/constant';
import { Type } from 'src/feature/car/entities/types.entity';
import { Steering } from 'src/feature/car/entities/steerings.entity';
import { Price } from 'src/feature/car/entities/prices.entity';
import { Status } from 'src/feature/car/entities/status.entity';
import { User } from 'src/feature/users/entities/user.entity';
import { UserRole } from 'src/feature/users/entities/user_role.entity';
import { Favorite } from 'src/feature/car/entities/favorite.entity';
import Order from 'src/feature/orders/entities/order.entity';
import Payment from 'src/feature/orders/entities/payment.entity';
import PaymentMethod from 'src/feature/orders/entities/paymnet_method.entity';
import PaymentStatus from 'src/feature/orders/entities/payment_status.entity';
import Coupon from 'src/feature/orders/entities/coupon.entity';
import CouponType from 'src/feature/orders/entities/coupon_type.entity';
import OrderStatus from 'src/feature/orders/entities/order_status.entity';

export const databaseProviders = [
  {
    provide: constant.SEQUELIZE,
    useFactory: () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        sync: { force: false },
      });
      sequelize.addModels([
        Car,
        Image,
        Type,
        Steering,
        Price,
        Status,
        User,
        UserRole,
        Favorite,
        Order,
        Payment,
        PaymentMethod,
        PaymentStatus,
        Coupon,
        CouponType,
        OrderStatus,
      ]);
      return sequelize;
    },
  },
];
