import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarService } from './car/car.service';
import { CarController } from './car/car.controller';
import { carProviders } from './car/car.providers';
import { DatabaseModule } from './data/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { AccessTokenStrategy } from './auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './auth/strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { userProviders } from './users/user.providers';
import { PassportModule } from '@nestjs/passport';
import { authProviders } from './auth/auth.providers';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ signOptions: { expiresIn: '60s' } }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [CarController,
    AppController,
    AuthController,
    UsersController],
  providers: [CarService,
    AppService,
    ...carProviders,
    AuthService,
    UsersService,
    ...userProviders,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ...authProviders],
})
export class AppModule {

}
