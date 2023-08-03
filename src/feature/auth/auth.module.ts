import { Module } from '@nestjs/common';
import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { MyService } from 'src/config.service';

@Module({
    imports: [UsersModule, JwtModule.register({}),
        PassportModule.register({ defaultStrategy: 'jwt' }),],
    providers: [...authProviders, AuthService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        MyService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
