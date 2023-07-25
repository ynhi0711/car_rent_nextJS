import Coupon from "database/models/Coupon"
import Payment from "database/models/payment"
import PaymentStatus from "database/models/payment_status"
import PaymentMethod from "database/models/paymnet_method"

export class PaymentResponseDto {
    id: number
    order_id: number
    user_id: number
    coupon: Coupon
    price: number
    payment_method: PaymentMethod
    payment_status: PaymentStatus
    createdAt: Date
    updatedAt: Date

    constructor(payment: Payment) {
        this.id = payment.id
        this.order_id = payment.order_id
        this.user_id = payment.user_id
        this.coupon = payment.coupon
        this.price = payment.price
        this.payment_method = payment.payment_method
        this.payment_status = payment.payment_status
        this.createdAt = payment.createdAt
        this.updatedAt = payment.updatedAt

    }
}