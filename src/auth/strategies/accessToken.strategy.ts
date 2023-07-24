import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { MyService } from 'src/config.service';

type JwtPayload = {
  sub: string;
  username: string;
  role: string
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(myService: MyService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: myService.getJwtAccessSecret(),
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}