import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { DetallesCarroService } from './detalles-carro.service';
import { CreateDetalleCarroDto } from './dto/create-detalle-carro.dto';
import { UpdateDetalleCarroDto } from './dto/update-detalle-carro.dto';

@Controller('detalles-carro')
export class DetallesCarroController {
  constructor(private readonly detallesCarroService: DetallesCarroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDetalleCarroDto: CreateDetalleCarroDto) {
    return this.detallesCarroService.create(createDetalleCarroDto);
  }

  @Get()
  findAll() {
    return this.detallesCarroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallesCarroService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetalleCarroDto: UpdateDetalleCarroDto,
  ) {
    return this.detallesCarroService.update(id, updateDetalleCarroDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallesCarroService.remove(id);
  }
}
