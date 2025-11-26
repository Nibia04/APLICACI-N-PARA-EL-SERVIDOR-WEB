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
import { UbicacionesService } from './ubicaciones.service';
import { CreateUbicacionDto } from './dtos/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dtos/update-ubicacion.dto';

@Controller('ubicaciones')
export class UbicacionesController {
    constructor(private readonly ubicacionesService: UbicacionesService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUbicacionDto: CreateUbicacionDto) {
        return this.ubicacionesService.create(createUbicacionDto);
    }

    @Get()
    async findAll() {
        return this.ubicacionesService.findAll();
    }

    @Get('ciudad/:ciudad')
    async findByCiudad(@Param('ciudad') ciudad: string) {
        return this.ubicacionesService.findByCiudad(ciudad);
    }

    @Get('capacidad/:minCapacidad')
    async findByCapacidad(@Param('minCapacidad') minCapacidad: string) {
        return this.ubicacionesService.findByCapacidad(parseInt(minCapacidad));
    }

    @Get('cercanas/:lat/:lng/:radio')
    async findCercanas(
        @Param('lat') lat: string,
        @Param('lng') lng: string,
        @Param('radio') radio: string,
    ) {
        return this.ubicacionesService.findCercanas(
            parseFloat(lat),
            parseFloat(lng),
            parseFloat(radio),
        );
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.ubicacionesService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateUbicacionDto: UpdateUbicacionDto,
    ) {
        return this.ubicacionesService.update(id, updateUbicacionDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.ubicacionesService.remove(id);
    }
}
