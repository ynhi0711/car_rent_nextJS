import { Sequelize } from 'sequelize-typescript';
import { Car } from 'database/models/car';
import { Image } from 'database/models/images';
import * as constant from '../common/constant';
import { Type } from 'database/models/types';
import { Steering } from 'database/models/steerings';
import { Price } from 'database/models/prices';
import { Status } from 'database/models/status';
import { User } from 'database/models/user';
import { UserRole } from 'database/models/user_role';
import { Favorite } from 'database/models/favorite';
import Order from 'database/models/order';
import Payment from 'database/models/payment';
import PaymentMethod from 'database/models/paymnet_method';
import PaymentStatus from 'database/models/payment_status';
import Coupon from 'database/models/Coupon';
import CouponType from 'database/models/coupon_type';
import OrderStatus from 'database/models/order_status';

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
        sync: { force: false }
      });
      sequelize.addModels([Car, Image, Type, Steering, Price, Status, User, UserRole, Favorite, Order, Payment, PaymentMethod, PaymentStatus, Coupon, CouponType, OrderStatus]);
      return sequelize;
    },
  },
];