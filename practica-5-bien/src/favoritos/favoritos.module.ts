import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FavoritosService } from './favoritos.service';
import { FavoritosResolver } from './favoritos.resolver';

@Module({
  imports: [HttpModule],
  providers: [FavoritosResolver, FavoritosService],
})
export class FavoritosModule {}
