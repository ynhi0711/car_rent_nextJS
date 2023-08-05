import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Car } from './car.entity';

@Table({
  tableName: 'prices',
  timestamps: true,
})
export class Price extends Model<Price> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => Car)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  car_id!: number;

  @Column({
    type: DataType.INTEGER,
  })
  price?: number;

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
}
