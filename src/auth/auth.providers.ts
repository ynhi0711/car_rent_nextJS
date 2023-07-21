import * as constant from '../common/constant';
import { AccessTokenGuard } from './guard/accessToken.guard';

export const authProviders = [
    {
        provide: constant.APP_GUARD,
        useClass: AccessTokenGuard,
      },
]