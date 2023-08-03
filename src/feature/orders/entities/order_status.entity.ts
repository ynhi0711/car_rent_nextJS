import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'order_statuses',
})
class OrderStatus extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
  })
  status!: string;

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
}

export default OrderStatus;

export enum OrderStatusEnum {
  Booked = 1,
  Rented = 2,
  Returned = 3,
}
