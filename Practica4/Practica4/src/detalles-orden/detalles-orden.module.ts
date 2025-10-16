import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesOrdenService } from './detalles-orden.service';
import { DetallesOrdenController } from './detalles-orden.controller';
import { DetalleOrden } from './entities/detalle-orden.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleOrden])],
  controllers: [DetallesOrdenController],
  providers: [DetallesOrdenService],
  exports: [DetallesOrdenService],
})
export class DetallesOrdenModule {}
