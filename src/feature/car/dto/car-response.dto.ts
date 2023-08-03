import Car from 'src/feature/car/entities/car.entity';
import { Price } from 'src/feature/car/entities/prices.entity';
import { Status } from 'src/feature/car/entities/status.entity';
import { Steering } from 'src/feature/car/entities/steerings.entity';
import { Type } from 'src/feature/car/entities/types.entity';

export class CarResponseDto {
  id: number;
  name: string;
  description: string;
  capacity: number;
  gasloline: number;
  car_type: Type;
  steering: Steering;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  price: Price;

  constructor(car: Car) {
    this.id = car.id;
    this.name = car.name;
    this.capacity = car.capacity;
    this.description = car.description;
    this.createdAt = car.createdAt;
    this.updatedAt = car.updatedAt;
    this.gasloline = car.gasoline;
    this.car_type = car.type;
    this.steering = car.steering;
    this.status = car.status;
    this.price = car.price[car.price.length - 1];
  }
}
