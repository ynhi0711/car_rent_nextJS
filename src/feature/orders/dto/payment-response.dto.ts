import Coupon from 'src/feature/orders/entities/coupon.entity';
import Payment from 'src/feature/orders/entities/payment.entity';
import PaymentStatus from 'src/feature/orders/entities/payment_status.entity';
import PaymentMethod from 'src/feature/orders/entities/paymnet_method.entity';

export class PaymentResponseDto {
  id: number;
  order_id: number;
  user_id: number;
  coupon: Coupon;
  price: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(payment: Payment) {
    this.id = payment.id;
    this.order_id = payment.order_id;
    this.user_id = payment.user_id;
    this.coupon = payment.coupon;
    this.price = payment.price;
    this.payment_method = payment.payment_method;
    this.payment_status = payment.payment_status;
    this.createdAt = payment.createdAt;
    this.updatedAt = payment.updatedAt;
  }
}
