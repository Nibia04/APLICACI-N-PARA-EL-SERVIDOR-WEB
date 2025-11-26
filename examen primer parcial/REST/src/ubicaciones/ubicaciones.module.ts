import { Module } from '@nestjs/common';
import { UbicacionesController } from './ubicaciones.controller';
import { UbicacionesService } from './ubicaciones.service';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
    imports: [WebhookModule],
    controllers: [UbicacionesController],
    providers: [UbicacionesService],
    exports: [UbicacionesService],
})
export class UbicacionesModule { }
