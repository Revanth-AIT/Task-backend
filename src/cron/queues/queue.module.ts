import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueProducerService } from './queue.producer.service';
import { QueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cronQueue', 
    }),
  ],
  providers: [QueueProducerService, QueueProcessor],
  exports: [QueueProducerService], 
})
export class QueueModule {}
