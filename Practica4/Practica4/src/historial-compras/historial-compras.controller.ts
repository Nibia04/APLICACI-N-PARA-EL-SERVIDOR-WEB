import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { HistorialComprasService } from './historial-compras.service';
import { CreateHistorialCompraDto } from './dto/create-historial-compra.dto';
import { UpdateHistorialCompraDto } from './dto/update-historial-compra.dto';

@Controller('historial-compras')
export class HistorialComprasController {
  constructor(private readonly historialComprasService: HistorialComprasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createHistorialCompraDto: CreateHistorialCompraDto) {
    return this.historialComprasService.create(createHistorialCompraDto);
  }

  @Get()
  findAll() {
    return this.historialComprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.historialComprasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHistorialCompraDto: UpdateHistorialCompraDto,
  ) {
    return this.historialComprasService.update(id, updateHistorialCompraDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.historialComprasService.remove(id);
  }
}
