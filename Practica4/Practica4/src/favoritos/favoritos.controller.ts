import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFavoritoDto: CreateFavoritoDto) {
    return this.favoritosService.create(createFavoritoDto);
  }

  @Get()
  findAll() {
    return this.favoritosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.favoritosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFavoritoDto: UpdateFavoritoDto,
  ) {
    return this.favoritosService.update(id, updateFavoritoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.favoritosService.remove(id);
  }
}
