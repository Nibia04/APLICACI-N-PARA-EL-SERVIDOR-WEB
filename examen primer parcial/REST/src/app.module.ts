import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventosModule } from './eventos/eventos.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { AsientosModule } from './asientos/asientos.module';
import { TiposEntradaModule } from './tipos-entrada/tipos-entrada.module';
import { ComprasModule } from './compras/compras.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WebhookModule,
    EventosModule,
    UbicacionesModule,
    AsientosModule,
    TiposEntradaModule,
    ComprasModule,
  ],
})
export class AppModule { }
