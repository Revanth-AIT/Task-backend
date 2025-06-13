import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueueProducerService } from './queues/queue.producer.service'; 

@Injectable()
export class CronService {
  constructor(private readonly queueService: QueueProducerService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('Running Cron Job...');
    this.queueService.addJob({ action: 'cleanOldData', time: new Date() });
  }
}
