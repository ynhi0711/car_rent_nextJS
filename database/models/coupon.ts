import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import CouponType from './coupon_type';

@Table({
  tableName: 'coupons',
})
class Coupon extends Model {
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
  code!: string;

  @ForeignKey(() => CouponType)
  @Column({
    type: DataType.NUMBER,
  })
  coupon_type_id!: number;

  @Column({
    type: DataType.NUMBER,
  })
  discount_value!: number;

  @Column({
    type: DataType.DATE,
  })
  expiration_date!: Date;

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

export default Coupon;

export enum CouponEnum{
Percentage = 1, FixedAmount = 2
}