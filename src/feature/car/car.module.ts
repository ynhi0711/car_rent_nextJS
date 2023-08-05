import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { carProviders } from './car.providers';
import { UsersService } from '../users/users.service';
import { userProviders } from '../users/user.providers';
import { QueuesModule } from 'src/common/queues/queues.module';
import { databaseProviders } from 'src/database/database.providers';

@Module({
    imports: [ QueuesModule],
    providers: [
        CarService,
        ...carProviders,
        ...userProviders,
        UsersService
    ],
    controllers: [CarController],
    exports: [CarService]
})
export class CarModule { }
