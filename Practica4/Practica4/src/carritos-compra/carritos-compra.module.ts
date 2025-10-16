import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritosCompraService } from './carritos-compra.service';
import { CarritosCompraController } from './carritos-compra.controller';
import { CarritoCompra } from './entities/carrito-compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarritoCompra])],
  controllers: [CarritosCompraController],
  providers: [CarritosCompraService],
  exports: [CarritosCompraService],
})
export class CarritosCompraModule {}
