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
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';

@Controller('compras')
export class ComprasController {
    constructor(private readonly comprasService: ComprasService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createCompraDto: CreateCompraDto) {
        return this.comprasService.create(createCompraDto);
    }

    @Get()
    async findAll() {
        return this.comprasService.findAll();
    }

    @Get('usuario/:usuarioId')
    async findByUsuario(@Param('usuarioId', new ParseUUIDPipe()) usuarioId: string) {
        return this.comprasService.findByUsuario(usuarioId);
    }

    @Get('evento/:eventoId')
    async findByEvento(@Param('eventoId', new ParseUUIDPipe()) eventoId: string) {
        return this.comprasService.findByEvento(eventoId);
    }

    @Get('estado/pendientes')
    async findPendientes() {
        return this.comprasService.findPendientes();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.comprasService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateCompraDto: UpdateCompraDto,
    ) {
        return this.comprasService.update(id, updateCompraDto);
    }

    @Put(':id/procesar-pago')
    async procesarPago(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body('numeroTransaccion') numeroTransaccion: string,
    ) {
        return this.comprasService.procesarPago(id, numeroTransaccion);
    }

    @Put(':id/confirmar')
    async confirmarCompra(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.comprasService.confirmarCompra(id);
    }

    @Put(':id/cancelar')
    async cancelarCompra(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.comprasService.cancelarCompra(id);
    }

    @Get('evento/:eventoId/ventas-totales')
    async obtenerVentasTotales(@Param('eventoId', new ParseUUIDPipe()) eventoId: string) {
        return this.comprasService.obtenerVentasTotales(eventoId);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.comprasService.remove(id);
    }
}
