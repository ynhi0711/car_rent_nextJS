import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'statuses',
  timestamps: true,
})
export class Status extends Model<Status> {
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
  status!: string;

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

export enum CarStatus {
  available = 1,
  rented = 2,
  unavailable = 3,
}
