import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('cronQueue')
export class QueueProcessor {
  @Process('cronTask')
  async handleCronTask(job: Job) {
    console.log(' Processing cron job:', job.data);
    // Add your actual logic here
  }
}
