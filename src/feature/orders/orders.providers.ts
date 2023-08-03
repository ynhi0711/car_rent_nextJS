import Coupon from 'src/feature/orders/entities/coupon.entity';
import * as constant from '../../common/constant';
import Order from 'src/feature/orders/entities/order.entity';

export const orderProviders = [
  {
    provide: constant.ORDERS_REPOSITORY,
    useValue: Order,
  },
  {
    provide: constant.COUPONS_REPOSITORY,
    useValue: Coupon,
  },
];
