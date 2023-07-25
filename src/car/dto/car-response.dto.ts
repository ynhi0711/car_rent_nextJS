import Car from "database/models/car"
import { Price } from "database/models/prices"
import { Status } from "database/models/status"
import { Steering } from "database/models/steerings"
import { Type } from "database/models/types"

export class CarResponseDto {
    id: number
    name: string
    description: string
    capacity: number
    gasloline: number
    car_type: Type
    steering: Steering
    status: Status
    createdAt: Date
    updatedAt: Date
    price: Price

    constructor(car: Car) {
        this.id = car.id
        this.name = car.name
        this.capacity = car.capacity
        this.description = car.description
        this.createdAt = car.createdAt
        this.updatedAt = car.updatedAt
        this.gasloline = car.gasoline
        this.car_type = car.type
        this.steering = car.steering
        this.status = car.status
        this.price = car.price[car.price.length - 1]
    }
}