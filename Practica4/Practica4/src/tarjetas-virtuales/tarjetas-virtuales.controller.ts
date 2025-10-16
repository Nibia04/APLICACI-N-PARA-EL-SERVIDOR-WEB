import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TarjetasVirtualesService } from './tarjetas-virtuales.service';
import { CreateTarjetaVirtualDto } from './dto/create-tarjeta-virtual.dto';
import { UpdateTarjetaVirtualDto } from './dto/update-tarjeta-virtual.dto';

@Controller('tarjetas-virtuales')
export class TarjetasVirtualesController {
  constructor(private readonly tarjetasVirtualesService: TarjetasVirtualesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTarjetaVirtualDto: CreateTarjetaVirtualDto) {
    return this.tarjetasVirtualesService.create(createTarjetaVirtualDto);
  }

  @Get()
  findAll() {
    return this.tarjetasVirtualesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarjetasVirtualesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTarjetaVirtualDto: UpdateTarjetaVirtualDto,
  ) {
    return this.tarjetasVirtualesService.update(id, updateTarjetaVirtualDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tarjetasVirtualesService.remove(id);
  }
}
