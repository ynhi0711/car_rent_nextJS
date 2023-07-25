import { Column, DataType, Model, Table, ForeignKey, BelongsTo, Sequelize, BeforeCreate } from 'sequelize-typescript';
import { UserRole } from './user_role';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {

  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => UserRole)
  @Column({
    type: DataType.INTEGER,
  })
  role_id: number;

  @BelongsTo(() => UserRole)
  role: UserRole

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  avatar_url: string;

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

export default User;
