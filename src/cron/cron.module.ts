import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { QueueModule } from './queues/queue.module';

@Module({
  imports: [ScheduleModule.forRoot(), QueueModule], 
  providers: [CronService],
})
export class CronModule {}
