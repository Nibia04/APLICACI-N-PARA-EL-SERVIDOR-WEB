import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CompraEntity } from './compra.entity';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class ComprasService {
    private compras: Map<string, CompraEntity> = new Map();

    constructor(private webhookService: WebhookService) { }

    async create(createCompraDto: CreateCompraDto): Promise<CompraEntity> {
        const id = uuidv4();
        const compra: CompraEntity = {
            ...createCompraDto,
            id,
            precioTotal: 0,
            estado: 'pendiente',
            referencias: '',
            fechaPago: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.compras.set(id, compra);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarCreacion('compra', compra, id);

        return compra;
    }

    async findAll(): Promise<CompraEntity[]> {
        return Array.from(this.compras.values());
    }

    async findOne(id: string): Promise<CompraEntity> {
        const compra = this.compras.get(id);
        if (!compra) {
            throw new NotFoundException(`Compra con ID ${id} no encontrada`);
        }
        return compra;
    }

    async update(id: string, updateCompraDto: UpdateCompraDto): Promise<CompraEntity> {
        const compra = await this.findOne(id);
        const actualizado: CompraEntity = {
            ...compra,
            ...updateCompraDto,
            estado: updateCompraDto.estado ? (updateCompraDto.estado as 'pendiente' | 'procesando' | 'pagado' | 'cancelado') : compra.estado,
            updatedAt: new Date(),
        };
        this.compras.set(id, actualizado);
        return actualizado;
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        this.compras.delete(id);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarEliminacion('compra', id);
    }

    async findByUsuario(usuarioId: string): Promise<CompraEntity[]> {
        return Array.from(this.compras.values())
            .filter(c => c.usuarioId === usuarioId)
            .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    }

    async findByEvento(eventoId: string): Promise<CompraEntity[]> {
        return Array.from(this.compras.values())
            .filter(c => c.eventoId === eventoId);
    }

    async findPendientes(): Promise<CompraEntity[]> {
        return Array.from(this.compras.values())
            .filter(c => c.estado === 'pendiente');
    }

    async procesarPago(id: string, numeroTransaccion: string): Promise<CompraEntity> {
        const compra = await this.findOne(id);
        if (compra.estado !== 'pendiente') {
            throw new Error(`Compra no está en estado pendiente`);
        }
        compra.estado = 'procesando' as any;
        compra.referencias = numeroTransaccion;
        compra.updatedAt = new Date();
        this.compras.set(id, compra);
        return compra;
    }

    async confirmarCompra(id: string): Promise<CompraEntity> {
        const compra = await this.findOne(id);
        if (compra.estado !== 'procesando') {
            throw new Error(`Compra debe estar procesando para confirmar`);
        }
        compra.estado = 'pagado' as any;
        compra.fechaPago = new Date();
        compra.updatedAt = new Date();
        this.compras.set(id, compra);
        return compra;
    }

    async cancelarCompra(id: string): Promise<CompraEntity> {
        const compra = await this.findOne(id);
        if (compra.estado === 'pagado') {
            throw new Error(`No se puede cancelar compra pagada`);
        }
        compra.estado = 'cancelado' as any;
        compra.updatedAt = new Date();
        this.compras.set(id, compra);
        return compra;
    }

    async obtenerVentasTotales(eventoId: string): Promise<{ total: number; cantidad: number }> {
        const compras = await this.findByEvento(eventoId);
        const ventasConfirmadas = compras.filter(c => c.estado === 'pagado');
        const total = ventasConfirmadas.reduce((sum, c) => sum + Number(c.precioTotal), 0);
        return { total, cantidad: ventasConfirmadas.length };
    }
}
