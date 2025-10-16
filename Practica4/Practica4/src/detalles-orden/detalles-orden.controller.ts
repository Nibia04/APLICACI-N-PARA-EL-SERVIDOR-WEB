import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { DetallesOrdenService } from './detalles-orden.service';
import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Controller('detalles-orden')
export class DetallesOrdenController {
  constructor(private readonly detallesOrdenService: DetallesOrdenService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDetalleOrdenDto: CreateDetalleOrdenDto) {
    return this.detallesOrdenService.create(createDetalleOrdenDto);
  }

  @Get()
  findAll() {
    return this.detallesOrdenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.detallesOrdenService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDetalleOrdenDto: UpdateDetalleOrdenDto,
  ) {
    return this.detallesOrdenService.update(id, updateDetalleOrdenDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.detallesOrdenService.remove(id);
  }
}
