import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
} from '@nestjs/common';
import { AsientosService } from './asientos.service';
import { CreateAsientoDto } from './dtos/create-asiento.dto';
import { UpdateAsientoDto } from './dtos/update-asiento.dto';

@Controller('asientos')
export class AsientosController {
    constructor(private readonly asientosService: AsientosService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createAsientoDto: CreateAsientoDto) {
        return this.asientosService.create(createAsientoDto);
    }

    @Get()
    async findAll() {
        return this.asientosService.findAll();
    }

    @Get('evento/:eventoId/disponibles')
    async findDisponiblesPorEvento(@Param('eventoId', new ParseUUIDPipe()) eventoId: string) {
        return this.asientosService.findDisponiblesPorEvento(eventoId);
    }

    @Get('fila/:fila')
    async findByFila(@Param('fila') fila: string) {
        return this.asientosService.findByFila(fila);
    }

    @Get('precio/:min/:max')
    async findByPriceRange(
        @Param('min') min: string,
        @Param('max') max: string,
    ) {
        return this.asientosService.findByPriceRange(parseFloat(min), parseFloat(max));
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.asientosService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateAsientoDto: UpdateAsientoDto,
    ) {
        return this.asientosService.update(id, updateAsientoDto);
    }

    @Put(':id/reservar')
    async reservar(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.asientosService.reservar(id);
    }

    @Put(':id/ocupar')
    async ocupar(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.asientosService.ocupar(id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.asientosService.remove(id);
    }
}
