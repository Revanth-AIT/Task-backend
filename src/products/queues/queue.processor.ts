import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('productQueue')
export class ProductQueueProcessor {
  @Process('productTask')
  async handleProductTask(job: Job) {
    console.log('🛒 Processing product job:', job.data);
    // Example logic: log product update, sync stock, etc.
  }
}
