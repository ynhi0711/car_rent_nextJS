import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './user.providers';
import { QueuesModule } from 'src/common/queues/queues.module';
import { databaseProviders } from 'src/database/database.providers';

@Module({
    imports: [QueuesModule],
    controllers: [UsersController],
    providers: [UsersService,
        ...userProviders,
    ],
    exports: [UsersService]
})
export class UsersModule { }
