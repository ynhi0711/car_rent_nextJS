import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Payment from './payment';

@Table({
  tableName: 'payment_statuses',
})
class PaymentStatus extends Model {
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

  @HasMany(() => Payment)
  payments: Payment[]
}

export default PaymentStatus;

export enum PaymentStatusEnum {
  Pending = 1, Paid = 2, Failed = 3
}