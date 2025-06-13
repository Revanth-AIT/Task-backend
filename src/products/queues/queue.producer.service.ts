import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ProductQueueProducerService {
  constructor(@InjectQueue('productQueue') private queue: Queue) {}

  async addProductJob(data: any) {
    await this.queue.add('productTask', data);
  }
}
