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
import { TiposEntradaService } from './tipos-entrada.service';
import { CreateTipoEntradaDto } from './dtos/create-tipo-entrada.dto';
import { UpdateTipoEntradaDto } from './dtos/update-tipo-entrada.dto';

@Controller('tipos-entrada')
export class TiposEntradaController {
    constructor(private readonly tiposEntradaService: TiposEntradaService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTipoEntradaDto: CreateTipoEntradaDto) {
        return this.tiposEntradaService.create(createTipoEntradaDto);
    }

    @Get()
    async findAll() {
        return this.tiposEntradaService.findAll();
    }

    @Get('evento/:eventoId')
    async findByEvento(@Param('eventoId', new ParseUUIDPipe()) eventoId: string) {
        return this.tiposEntradaService.findByEvento(eventoId);
    }

    @Get('precio/:min/:max')
    async findByPriceRange(
        @Param('min') min: string,
        @Param('max') max: string,
    ) {
        return this.tiposEntradaService.findByPriceRange(parseFloat(min), parseFloat(max));
    }

    @Get('disponibles/stock')
    async findDisponibles() {
        return this.tiposEntradaService.findDisponibles();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.tiposEntradaService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateTipoEntradaDto: UpdateTipoEntradaDto,
    ) {
        return this.tiposEntradaService.update(id, updateTipoEntradaDto);
    }

    @Put(':id/reducir-stock')
    async reducirStock(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body('cantidad') cantidad: number,
    ) {
        return this.tiposEntradaService.reducirStock(id, cantidad);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.tiposEntradaService.remove(id);
    }
}
