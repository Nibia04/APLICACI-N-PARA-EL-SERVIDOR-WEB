import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AsientoEntity } from './asiento.entity';
import { CreateAsientoDto } from './dtos/create-asiento.dto';
import { UpdateAsientoDto } from './dtos/update-asiento.dto';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class AsientosService {
    private asientos: Map<string, AsientoEntity> = new Map();

    constructor(private webhookService: WebhookService) { }

    async create(createAsientoDto: CreateAsientoDto): Promise<AsientoEntity> {
        const id = uuidv4();
        const asiento: AsientoEntity = {
            ...createAsientoDto,
            id,
            estado: 'disponible',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.asientos.set(id, asiento);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarCreacion('asiento', asiento, id);

        return asiento;
    }

    async findAll(): Promise<AsientoEntity[]> {
        return Array.from(this.asientos.values());
    }

    async findOne(id: string): Promise<AsientoEntity> {
        const asiento = this.asientos.get(id);
        if (!asiento) {
            throw new NotFoundException(`Asiento con ID ${id} no encontrado`);
        }
        return asiento;
    }

    async update(id: string, updateAsientoDto: UpdateAsientoDto): Promise<AsientoEntity> {
        const asiento = await this.findOne(id);
        const actualizado: AsientoEntity = {
            ...asiento,
            ...updateAsientoDto,
            estado: updateAsientoDto.estado ? (updateAsientoDto.estado as 'disponible' | 'reservado' | 'ocupado') : asiento.estado,
            updatedAt: new Date(),
        };
        this.asientos.set(id, actualizado);
        return actualizado;
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        this.asientos.delete(id);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarEliminacion('asiento', id);
    }

    async findDisponiblesPorEvento(eventoId: string): Promise<AsientoEntity[]> {
        return Array.from(this.asientos.values())
            .filter(a => a.eventoId === eventoId && a.estado === 'disponible');
    }

    async findByFila(fila: string): Promise<AsientoEntity[]> {
        return Array.from(this.asientos.values())
            .filter(a => a.fila === fila)
            .sort((a, b) => a.numero - b.numero);
    }

    async findByPriceRange(min: number, max: number): Promise<AsientoEntity[]> {
        return Array.from(this.asientos.values())
            .filter(a => a.precio >= min && a.precio <= max);
    }

    async reservar(id: string): Promise<AsientoEntity> {
        const asiento = await this.findOne(id);
        if (asiento.estado !== 'disponible') {
            throw new Error(`Asiento no está disponible`);
        }
        asiento.estado = 'reservado';
        asiento.updatedAt = new Date();
        this.asientos.set(id, asiento);
        return asiento;
    }

    async ocupar(id: string): Promise<AsientoEntity> {
        const asiento = await this.findOne(id);
        if (asiento.estado === 'ocupado') {
            throw new Error(`Asiento ya está ocupado`);
        }
        asiento.estado = 'ocupado';
        asiento.updatedAt = new Date();
        this.asientos.set(id, asiento);
        return asiento;
    }
}
