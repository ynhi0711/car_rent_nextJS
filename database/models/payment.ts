import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import Coupon from './Coupon';
import PaymentStatus from './payment_status';
import Order from './order';
import PaymentMethod from './paymnet_method';

@Table({
  tableName: 'payments',
})
class Payment extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.NUMBER,
  })
  order_id!: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Coupon)
  @Column({
    type: DataType.NUMBER,
  })
  coupon_id!: number;

  @BelongsTo(() => Coupon)
  coupon: Coupon;

  @ForeignKey(() => PaymentStatus)
  @Column({
    type: DataType.NUMBER,
  })
  payment_status_id!: number;

  @BelongsTo(() => PaymentStatus)
  payment_status: PaymentStatus;

  @Column({
    type: DataType.NUMBER,
  })
  price!: number;

  @ForeignKey(() => PaymentMethod)
  @Column
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  payment_method: PaymentMethod;

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

export default Payment;
