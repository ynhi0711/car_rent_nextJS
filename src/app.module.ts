import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarService } from './car/car.service';
import { CarController } from './car/car.controller';
import { carProviders } from './car/car.providers';
import { DatabaseModule } from './data/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CarController, AppController],
  providers: [CarService, AppService, ...carProviders],
})
export class AppModule { }
