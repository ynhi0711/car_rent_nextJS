import { Column, DataType, Model, Table, ForeignKey, Sequelize } from 'sequelize-typescript';
import { User } from './user';
import { Car } from './car';

@Table({
  tableName: 'favorites',
  timestamps: true,
})
export class Favorite extends Model<Favorite> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => User) // Assuming there is a User model
  @Column({
    type: DataType.INTEGER,
  })
  user_id: number;

  @ForeignKey(() => Car) // Assuming there is a Car model
  @Column({
    type: DataType.INTEGER,
  })
  car_id: number;

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