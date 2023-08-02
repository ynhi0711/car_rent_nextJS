import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { QueuesModule } from 'src/common/queues/queues.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [DatabaseModule, QueuesModule, JwtModule],
    controllers: [UsersController],
    providers: [UsersService,
        ...userProviders,
        
    ],
    exports: [UsersService]
})
export class UsersModule { }
