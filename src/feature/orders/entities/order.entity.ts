import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import Car from '../../car/entities/car.entity';
import User from '../../users/entities/user.entity';
import OrderStatus from './order_status.entity';
import Payment from './payment.entity';

@Table({
  tableName: 'orders',
})
class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Car)
  @Column({
    type: DataType.NUMBER,
  })
  car_id!: number;

  @BelongsTo(() => Car)
  car!: Car;

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => OrderStatus)
  @Column({
    type: DataType.NUMBER,
  })
  order_status_id!: number;

  @BelongsTo(() => OrderStatus)
  orderStatus: OrderStatus;

  @Column({
    type: DataType.DATE,
  })
  drop_off_date!: Date;

  @Column({
    type: DataType.STRING,
  })
  drop_off_location!: string;

  @Column({
    type: DataType.DATE,
  })
  pick_up_date!: Date;

  @Column({
    type: DataType.STRING,
  })
  pick_up_location!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updatedAt!: Date;

  @HasOne(() => Payment)
  payment: Payment;
}

export default Order;
