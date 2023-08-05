import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'types',
})
export class Type extends Model<Type> {
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
    field: 'createdAt',
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updatedAt',
  })
  updatedAt!: Date;
}
