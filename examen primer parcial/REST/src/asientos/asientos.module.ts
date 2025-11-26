import { Module } from '@nestjs/common';
import { AsientosController } from './asientos.controller';
import { AsientosService } from './asientos.service';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
    imports: [WebhookModule],
    controllers: [AsientosController],
    providers: [AsientosService],
    exports: [AsientosService],
})
export class AsientosModule { }
