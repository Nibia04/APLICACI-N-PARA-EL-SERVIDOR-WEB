import { Module } from '@nestjs/common';
import { TiposEntradaController } from './tipos-entrada.controller';
import { TiposEntradaService } from './tipos-entrada.service';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
    imports: [WebhookModule],
    controllers: [TiposEntradaController],
    providers: [TiposEntradaService],
    exports: [TiposEntradaService],
})
export class TiposEntradaModule { }
