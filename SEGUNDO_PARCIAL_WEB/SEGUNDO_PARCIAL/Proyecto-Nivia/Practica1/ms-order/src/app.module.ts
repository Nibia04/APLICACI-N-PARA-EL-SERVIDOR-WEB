import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { Order } from './order/order.entity';
import { IdempotencyGuard } from './idempotency/idempotency.guard';
import { IdempotencyService } from './idempotency/idempotency.service';
import { Idempotency } from './idempotency/idempotency.entity';
import { RedisService } from './redis/redis.service';
import { WebhookModule } from './webhook/webhook.module';
import { WebhookSubscription } from './webhook/entities/webhook-subscription.entity';
import { WebhookDelivery } from './webhook/entities/webhook-delivery.entity';
import { WebhookEventEntity } from './webhook/entities/webhook-event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'pguser',
      password: 'pgpass',
      database: 'order_db',
      entities: [Order, Idempotency, WebhookSubscription, WebhookDelivery, WebhookEventEntity],
      synchronize: true, // Solo para desarrollo
    }),
    TypeOrmModule.forFeature([Order, Idempotency]),
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'product_queue',
          queueOptions: { durable: true },
        },
      },
      {
        name: 'WEBHOOK_PUBLISHER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'webhook_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    WebhookModule,
  ],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService, IdempotencyGuard, IdempotencyService, RedisService],
})
export class AppModule {}
