import { Column, Model, Table, DataType, ForeignKey } from "sequelize-typescript";
import { Car } from "./car";

@Table({
  tableName: "prices",
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
  original_price?: number;

  @Column({
    type: DataType.INTEGER,
  })
  discount?: number;

  @Column({
    type: DataType.INTEGER,
  })
  final_price?: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'created_at'
  })
  createdAt!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'updated_at'
  })
  updatedAt!: Date;
}