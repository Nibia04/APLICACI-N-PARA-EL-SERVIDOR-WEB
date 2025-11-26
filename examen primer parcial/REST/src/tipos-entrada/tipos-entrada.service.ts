import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { TipoEntradaEntity } from './tipo-entrada.entity';
import { CreateTipoEntradaDto } from './dtos/create-tipo-entrada.dto';
import { UpdateTipoEntradaDto } from './dtos/update-tipo-entrada.dto';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class TiposEntradaService {
    private tiposEntrada: Map<string, TipoEntradaEntity> = new Map();

    constructor(private webhookService: WebhookService) { }

    async create(createTipoEntradaDto: CreateTipoEntradaDto): Promise<TipoEntradaEntity> {
        const id = uuidv4();
        const tipoEntrada = {
            ...createTipoEntradaDto,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tiposEntrada.set(id, tipoEntrada);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarCreacion('tipo-entrada', tipoEntrada, id);

        return tipoEntrada;
    }

    async findAll(): Promise<TipoEntradaEntity[]> {
        return Array.from(this.tiposEntrada.values());
    }

    async findOne(id: string): Promise<TipoEntradaEntity> {
        const tipoEntrada = this.tiposEntrada.get(id);
        if (!tipoEntrada) {
            throw new NotFoundException(`Tipo de entrada con ID ${id} no encontrado`);
        }
        return tipoEntrada;
    }

    async update(id: string, updateTipoEntradaDto: UpdateTipoEntradaDto): Promise<TipoEntradaEntity> {
        const tipoEntrada = await this.findOne(id);
        const actualizado = {
            ...tipoEntrada,
            ...updateTipoEntradaDto,
            updatedAt: new Date(),
        };
        this.tiposEntrada.set(id, actualizado);
        return actualizado;
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        this.tiposEntrada.delete(id);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarEliminacion('tipo-entrada', id);
    }

    async findByEvento(eventoId: string): Promise<TipoEntradaEntity[]> {
        return Array.from(this.tiposEntrada.values())
            .filter(t => t.eventoId === eventoId);
    }

    async findByPriceRange(min: number, max: number): Promise<TipoEntradaEntity[]> {
        return Array.from(this.tiposEntrada.values())
            .filter(t => t.precioBase >= min && t.precioBase <= max);
    }

    async findDisponibles(): Promise<TipoEntradaEntity[]> {
        return Array.from(this.tiposEntrada.values())
            .filter(t => t.cantidad > 0);
    }

    async reducirStock(id: string, cantidad: number): Promise<TipoEntradaEntity> {
        const tipoEntrada = await this.findOne(id);
        if (tipoEntrada.cantidad < cantidad) {
            throw new Error(`Stock insuficiente`);
        }
        tipoEntrada.cantidad -= cantidad;
        tipoEntrada.updatedAt = new Date();
        this.tiposEntrada.set(id, tipoEntrada);
        return tipoEntrada;
    }
}
