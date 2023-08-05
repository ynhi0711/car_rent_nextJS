import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  HasMany,
  HasOne,
  ForeignKey,
} from 'sequelize-typescript';
import { Type } from './types.entity';
import { Steering } from './steerings.entity';
import { Status } from './status.entity';
import { Image } from './images.entity';
import { Price } from './prices.entity';
import Order from '../../orders/entities/order.entity';

@Table({
  tableName: 'cars',
  timestamps: true,
})
export class Car extends Model<Car> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
  })
  capacity?: number;

  @Column({
    type: DataType.INTEGER,
  })
  gasoline?: number;

  @ForeignKey(() => Type)
  @Column({
    type: DataType.INTEGER,
    field: 'type_id',
  })
  type_id?: number;

  @BelongsTo(() => Type)
  type: Type;

  @ForeignKey(() => Steering)
  @Column({
    type: DataType.INTEGER,
    field: 'steering_id',
  })
  steering_id?: number;

  @BelongsTo(() => Steering)
  steering: Steering;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    field: 'status_id',
  })
  status_id?: number;

  @BelongsTo(() => Status)
  status: Status;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'createdAt',
  })
  createdAt!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'updatedAt',
  })
  updatedAt!: Date;

  @HasMany(() => Image)
  images: Image[];

  @HasMany(() => Price)
  price: Price[];

  @HasMany(() => Order)
  orders: Order[];
}

export default Car;
