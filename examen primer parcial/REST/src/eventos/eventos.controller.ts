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
    Query,
} from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';

@Controller('eventos')
export class EventosController {
    constructor(private readonly eventosService: EventosService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createEventoDto: CreateEventoDto) {
        return this.eventosService.create(createEventoDto);
    }

    @Get()
    async findAll() {
        return this.eventosService.findAll();
    }

    @Get('proximos/lista')
    async findProximos() {
        return this.eventosService.findProximos();
    }

    @Get('precio/:min/:max')
    async findByPriceRange(
        @Param('min') min: string,
        @Param('max') max: string,
    ) {
        return this.eventosService.findByPriceRange(parseFloat(min), parseFloat(max));
    }

    @Get('artista/:nombre')
    async findByArtista(@Param('nombre') nombre: string) {
        return this.eventosService.findByArtista(nombre);
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.eventosService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateEventoDto: UpdateEventoDto,
    ) {
        return this.eventosService.update(id, updateEventoDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.eventosService.remove(id);
    }
}
