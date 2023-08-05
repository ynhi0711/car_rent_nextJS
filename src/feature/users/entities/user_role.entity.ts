import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'user_roles',
  timestamps: true,
})
export class UserRole extends Model<UserRole> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  role: string;

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
