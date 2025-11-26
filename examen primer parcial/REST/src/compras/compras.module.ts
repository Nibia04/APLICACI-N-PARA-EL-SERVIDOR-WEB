import { Module } from '@nestjs/common';
import { ComprasController } from './compras.controller';
import { ComprasService } from './compras.service';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
    imports: [WebhookModule],
    controllers: [ComprasController],
    providers: [ComprasService],
    exports: [ComprasService],
})
export class ComprasModule { }
