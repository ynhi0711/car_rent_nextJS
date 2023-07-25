import * as constant from '../../common/constant';
import { User } from 'src/feature/users/entities/user.entity';

export const userProviders = [
  {
    provide: constant.USERS_REPOSITORY,
    useValue: User,
  },
];
