import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderProviders } from './orders.providers';
import { OrdersController } from './orders.controller';
import { carProviders } from '../car/car.providers';
import { userProviders } from '../users/user.providers';
import { QueuesModule } from 'src/common/queues/queues.module';
import { UsersService } from '../users/users.service';
import { databaseProviders } from 'src/database/database.providers';

@Module({
    imports: [QueuesModule],
    providers: [
        OrdersService,
        ...orderProviders,
        ...carProviders,
        ...userProviders,
        UsersService
    ],
    controllers: [OrdersController],
    exports: [OrdersService]
})
export class OrdersModule { }
