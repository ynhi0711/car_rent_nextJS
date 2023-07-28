import { BullModule } from '@nestjs/bull/dist/bull.module';
import { Module } from '@nestjs/common'
import { QueueConsumer } from './queues.consumer';
import { QueueService } from './queues.service';
import { EMAIL_QUEUE } from '../common/constant'
import { MyService } from 'src/config.service';
@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
  }),
  BullModule.registerQueue({
    name: EMAIL_QUEUE,
  }),],
  providers: [QueueService, QueueConsumer, MyService],
  exports: [QueueService],

})
export class QueuesModule { }