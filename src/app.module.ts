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
import { MyService } from './config.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { orderProviders } from './orders/orders.providers';
import { WinstonModule } from 'nest-winston';
import { LoggerMiddleware } from './middleware/logging-middleware';
import * as winston from 'winston';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}`, isGlobal: true }),
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
  controllers: [CarController,
    AppController,
    AuthController,
    UsersController,
    OrdersController],
  providers: [CarService,
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
    OrdersService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
