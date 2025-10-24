import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HistorialComprasService } from './historial-compras.service';
import { HistorialComprasResolver } from './historial-compras.resolver';

@Module({
  imports: [HttpModule],
  providers: [HistorialComprasResolver, HistorialComprasService],
})
export class HistorialComprasModule {}
