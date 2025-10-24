import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CategoriasService } from './categorias.service';
import { CategoriasResolver } from './categorias.resolver';

@Module({
  imports: [HttpModule],
  providers: [CategoriasResolver, CategoriasService],
})
export class CategoriasModule {}
