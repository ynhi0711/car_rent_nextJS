import { Sequelize } from 'sequelize-typescript';
import { Car } from 'database/models/car';
import { Image } from 'database/models/images';
import * as constant from '../common/constant';
import { Type } from 'database/models/types';
import { Steering } from 'database/models/steerings';
import { Price } from 'database/models/prices';
import { Status } from 'database/models/status';
import { User } from 'database/models/user';
import { UserRole } from 'database/models/user_role';
import { Favorite } from 'database/models/favorite';

export const databaseProviders = [
  {
    provide: constant.SEQUELIZE,
    useFactory: () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOSTNAME,
        // host: '127.0.0.1',
        port: parseInt(process.env.DB_PORT),
        // port: 3306,
        // username: 'root',
        username: process.env.DB_USERNAME,
        // password: 'Ynhi071196**',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // database: 'db_5',
        sync: { force: false }
      });
      sequelize.addModels([Car, Image, Type, Steering, Price, Status, User, UserRole, Favorite]);
      return sequelize;
    },
  },
];