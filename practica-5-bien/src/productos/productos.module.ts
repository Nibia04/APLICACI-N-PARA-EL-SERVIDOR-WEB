import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductosService } from './productos.service';
import { ProductosResolver } from './productos.resolver';

@Module({
  imports: [HttpModule],
  providers: [ProductosResolver, ProductosService],
})
export class ProductosModule {}
