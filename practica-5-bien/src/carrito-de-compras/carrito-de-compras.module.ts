import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CarritoDeComprasService } from './carrito-de-compras.service';
import { CarritoDeComprasResolver } from './carrito-de-compras.resolver';

@Module({
  imports: [HttpModule],
  providers: [CarritoDeComprasResolver, CarritoDeComprasService],
})
export class CarritoDeComprasModule {}
