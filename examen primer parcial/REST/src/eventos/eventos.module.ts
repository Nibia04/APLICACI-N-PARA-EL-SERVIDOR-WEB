import { Module } from '@nestjs/common';
import { EventosController } from './eventos.controller';
import { EventosService } from './eventos.service';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
    imports: [WebhookModule],
    controllers: [EventosController],
    providers: [EventosService],
    exports: [EventosService],
})
export class EventosModule { }
