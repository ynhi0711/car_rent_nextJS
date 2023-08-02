import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { carProviders } from './car.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from '../users/users.service';
import { userProviders } from '../users/user.providers';
import { QueuesModule } from 'src/common/queues/queues.module';

@Module({
    imports: [DatabaseModule, QueuesModule],
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
