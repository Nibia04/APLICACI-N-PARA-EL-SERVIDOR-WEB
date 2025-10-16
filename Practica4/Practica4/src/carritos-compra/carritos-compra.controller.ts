import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CarritosCompraService } from './carritos-compra.service';
import { CreateCarritoCompraDto } from './dto/create-carrito-compra.dto';
import { UpdateCarritoCompraDto } from './dto/update-carrito-compra.dto';

@Controller('carritos-compra')
export class CarritosCompraController {
  constructor(private readonly carritosCompraService: CarritosCompraService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCarritoCompraDto: CreateCarritoCompraDto) {
    return this.carritosCompraService.create(createCarritoCompraDto);
  }

  @Get()
  findAll() {
    return this.carritosCompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carritosCompraService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarritoCompraDto: UpdateCarritoCompraDto,
  ) {
    return this.carritosCompraService.update(id, updateCarritoCompraDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carritosCompraService.remove(id);
  }
}
