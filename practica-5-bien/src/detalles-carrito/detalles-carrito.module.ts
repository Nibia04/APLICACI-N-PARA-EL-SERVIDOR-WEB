import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DetallesCarritoService } from './detalles-carrito.service';
import { DetallesCarritoResolver } from './detalles-carrito.resolver';

@Module({
  imports: [HttpModule],
  providers: [DetallesCarritoResolver, DetallesCarritoService],
})
export class DetallesCarritoModule {}
