import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Payment from './payment';

@Table({
  tableName: 'payment_methods',
})
class PaymentMethod extends Model {
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
  name!: string;

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

export default PaymentMethod;

export enum PaymentMethodEnum {
  Cash = 1, CreditCard = 2
}