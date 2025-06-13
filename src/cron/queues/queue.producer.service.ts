import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';


@Injectable()
export class QueueProducerService {
  constructor(@InjectQueue('cronQueue') private readonly cronQueue: Queue) {}

  async addJob(data: any) {
    await this.cronQueue.add(data);
  }
}
