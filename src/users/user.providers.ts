import * as constant from '../common/constant';
import { User } from "database/models/user";


export const userProviders = [
  {
    provide: constant.USERS_REPOSITORY,
    useValue: User,
  },
];