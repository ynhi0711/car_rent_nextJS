import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'steerings',
  timestamps: true,
})
export class Steering extends Model<Steering> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  name!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'created_at',
  })
  createdAt!: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: 'updated_at',
  })
  updatedAt!: Date;
}
