import Coupon from 'database/models/Coupon';
import * as constant from '../common/constant';
import Order from "database/models/order";


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