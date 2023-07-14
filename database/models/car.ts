import { Column, Model, Table, DataType, BelongsTo, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
import { Type } from "./types";
import { Steering } from "./steerings";
import { Status } from "./status";
import { Image } from "./images";
import { Price } from "./prices";

@Table({
  tableName: "cars",
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
    field: 'type_id'
  })
  typeId?: number;

  @BelongsTo(() => Type)
  type: Type;

  @ForeignKey(() => Steering)
  @Column({
    type: DataType.INTEGER,
    field: 'steering_id'
  })
  steeringId?: number;

  @BelongsTo(() => Steering)
  steering: Steering;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    field: 'status_id'
  })
  statusId?: number;

  @BelongsTo(() => Status)
  status: Status;

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

  @HasMany(() => Image)
  images: Image[]

  @HasOne(() => Price)
  price: Price
}