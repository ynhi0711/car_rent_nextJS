import Car from "database/models/car"
import OrderStatus from "database/models/order_status"
import Payment from "database/models/payment"
import { UserResponseDto } from "src/users/dto/user_response.dto"
import { PaymentResponseDto } from "./payment-response.dto"
import { CarResponseDto } from "src/car/dto/car-response.dto"
import Order from "database/models/order"
import { or } from "sequelize"

export class OrderResponseDto {
    id: number
    drop_off_date: Date
    drop_off_location: string
    pick_up_date: Date
    pick_up_location: string
    createdAt: Date
    updatedAt: Date
    order_status: OrderStatus
    car: CarResponseDto
    user: UserResponseDto
    payment: PaymentResponseDto


    constructor(order: Order) {
        this.id = order.id
        this.car = new CarResponseDto(order.car)
        this.user = new UserResponseDto(order.user)
        this.order_status = order.orderStatus
        this.drop_off_date = order.drop_off_date
        this.drop_off_location = order.drop_off_location
        this.pick_up_date = order.pick_up_date
        this.pick_up_location = order.pick_up_location
        this.payment = new PaymentResponseDto(order.payment)
        this.createdAt = order.createdAt
        this.updatedAt = order.updatedAt

    }
}