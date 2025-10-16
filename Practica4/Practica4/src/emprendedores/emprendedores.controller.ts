import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { EmprendedoresService } from './emprendedores.service';
import { CreateEmprendedorDto } from './dto/create-emprendedore.dto';
import { UpdateEmprendedorDto } from './dto/update-emprendedore.dto';

@Controller('emprendedores')
export class EmprendedoresController {
  constructor(private readonly emprendedoresService: EmprendedoresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createEmprendedorDto: CreateEmprendedorDto) {
    return this.emprendedoresService.create(createEmprendedorDto);
  }

  @Get()
  findAll() {
    return this.emprendedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emprendedoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmprendedorDto: UpdateEmprendedorDto,
  ) {
    return this.emprendedoresService.update(id, updateEmprendedorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emprendedoresService.remove(id);
  }
}

