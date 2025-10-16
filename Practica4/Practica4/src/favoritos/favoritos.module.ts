import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { Favorito } from './entities/favorito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorito])],
  controllers: [FavoritosController],
  providers: [FavoritosService],
  exports: [FavoritosService],
})
export class FavoritosModule {}
