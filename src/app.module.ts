import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { MailModule } from './mail/mail.module';
import { CronModule } from './cron/cron.module';
import { QueueModule } from './cron/queues/queue.module'; 
import { ProductQueueModule } from './products/queues/queue.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    ProductsModule,
    MailModule,
    CronModule,
    QueueModule,
    ProductQueueModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
