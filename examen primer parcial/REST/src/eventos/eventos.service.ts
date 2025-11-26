import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EventoEntity } from './evento.entity';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class EventosService {
    private eventos: Map<string, EventoEntity> = new Map();

    constructor(private webhookService: WebhookService) { }

    async create(createEventoDto: CreateEventoDto): Promise<EventoEntity> {
        const id = uuidv4();
        const evento: EventoEntity = {
            ...createEventoDto,
            id,
            estado: 'activo',
            fecha: new Date(createEventoDto.fecha),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.eventos.set(id, evento);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarCreacion('evento', evento, id);

        return evento;
    }

    async findAll(): Promise<EventoEntity[]> {
        return Array.from(this.eventos.values());
    }

    async findOne(id: string): Promise<EventoEntity> {
        const evento = this.eventos.get(id);
        if (!evento) {
            throw new NotFoundException(`Evento con ID ${id} no encontrado`);
        }
        return evento;
    }

    async update(id: string, updateEventoDto: UpdateEventoDto): Promise<EventoEntity> {
        const evento = await this.findOne(id);
        const actualizado: EventoEntity = {
            ...evento,
            ...updateEventoDto,
            fecha: updateEventoDto.fecha ? new Date(updateEventoDto.fecha) : evento.fecha,
            estado: updateEventoDto.estado ? (updateEventoDto.estado as 'activo' | 'cancelado' | 'finalizado') : evento.estado,
            updatedAt: new Date(),
        };
        this.eventos.set(id, actualizado);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarActualizacion('evento', id, updateEventoDto);

        return actualizado;
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        this.eventos.delete(id);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarEliminacion('evento', id);
    }

    async findProximos(): Promise<EventoEntity[]> {
        const hoy = new Date();
        return Array.from(this.eventos.values())
            .filter(e => new Date(e.fecha) > hoy)
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
            .slice(0, 10);
    }

    async findByPriceRange(min: number, max: number): Promise<EventoEntity[]> {
        return Array.from(this.eventos.values())
            .filter(e => e.precioBase >= min && e.precioBase <= max);
    }

    async findByArtista(nombre: string): Promise<EventoEntity[]> {
        return Array.from(this.eventos.values())
            .filter(e => e.artista.toLowerCase().includes(nombre.toLowerCase()));
    }
}
