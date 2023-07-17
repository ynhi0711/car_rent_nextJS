import { Sequelize } from 'sequelize-typescript';
import { Car } from 'database/models/car';
import { Image } from 'database/models/images';
import * as constant from '../constant';
import { Type } from 'database/models/types';
import { Steering } from 'database/models/steerings';
import { Price } from 'database/models/prices';
import { Status } from 'database/models/status';

export const databaseProviders = [
  {
    provide: constant.SEQUELIZE,
    useFactory: () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'Ynhi071196**',
        database: 'db_5',
        sync:{force: false}
      });
      sequelize.addModels([Car, Image, Type, Steering, Price, Status]);
      return sequelize;
    },
  },
];