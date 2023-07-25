import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarService } from './feature/car/car.service';
import { CarController } from './feature/car/car.controller';
import { carProviders } from './feature/car/car.providers';
import { AuthController } from './feature/auth/auth.controller';
import { AuthService } from './feature/auth/auth.service';
import { UsersService } from './feature/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './feature/users/users.controller';
import { AccessTokenStrategy } from './feature/auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './feature/auth/strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { userProviders } from './feature/users/user.providers';
import { PassportModule } from '@nestjs/passport';
import { authProviders } from './feature/auth/auth.providers';
import { MyService } from './config.service';
import { OrdersController } from './feature/orders/orders.controller';
import { OrdersService } from './feature/orders/orders.service';
import { orderProviders } from './feature/orders/orders.providers';
import { WinstonModule } from 'nest-winston';
import { LoggerMiddleware } from './middleware/logging-middleware';
import * as winston from 'winston';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({
            level: 'info',
            filename: 'logs/application.log',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
            ),
          }),
        ],
      }),
    }),
  ],
  controllers: [
    CarController,
    AppController,
    AuthController,
    UsersController,
    OrdersController,
  ],
  providers: [
    CarService,
    AppService,
    ...carProviders,
    ...orderProviders,
    AuthService,
    UsersService,
    ...userProviders,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ...authProviders,
    MyService,
    OrdersService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
