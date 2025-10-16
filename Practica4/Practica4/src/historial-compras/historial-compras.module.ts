import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialComprasService } from './historial-compras.service';
import { HistorialComprasController } from './historial-compras.controller';
import { HistorialCompra } from './entities/historial-compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialCompra])],
  controllers: [HistorialComprasController],
  providers: [HistorialComprasService],
  exports: [HistorialComprasService],
})
export class HistorialComprasModule {}
