import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ProductQueueProducerService } from './queue.producer.service';
import { ProductQueueProcessor } from './queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'productQueue',
    }),
  ],
  providers: [ProductQueueProducerService, ProductQueueProcessor],
  exports: [ProductQueueProducerService],
})
export class ProductQueueModule {}
