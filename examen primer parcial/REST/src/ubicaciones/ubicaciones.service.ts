import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UbicacionEntity } from './ubicacion.entity';
import { CreateUbicacionDto } from './dtos/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dtos/update-ubicacion.dto';
import { WebhookService } from '../webhook/webhook.service';

@Injectable()
export class UbicacionesService {
    private ubicaciones: Map<string, UbicacionEntity> = new Map();

    constructor(private webhookService: WebhookService) { }

    async create(createUbicacionDto: CreateUbicacionDto): Promise<UbicacionEntity> {
        const id = uuidv4();
        const ubicacion = {
            ...createUbicacionDto,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.ubicaciones.set(id, ubicacion);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarCreacion('ubicacion', ubicacion, id);

        return ubicacion;
    }

    async findAll(): Promise<UbicacionEntity[]> {
        return Array.from(this.ubicaciones.values());
    }

    async findOne(id: string): Promise<UbicacionEntity> {
        const ubicacion = this.ubicaciones.get(id);
        if (!ubicacion) {
            throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
        }
        return ubicacion;
    }

    async update(id: string, updateUbicacionDto: UpdateUbicacionDto): Promise<UbicacionEntity> {
        const ubicacion = await this.findOne(id);
        const actualizado = {
            ...ubicacion,
            ...updateUbicacionDto,
            updatedAt: new Date(),
        };
        this.ubicaciones.set(id, actualizado);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarActualizacion('ubicacion', id, updateUbicacionDto);

        return actualizado;
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        this.ubicaciones.delete(id);

        // 🔗 Notificar al webhook
        await this.webhookService.procesarEliminacion('ubicacion', id);
    }

    async findByCiudad(ciudad: string): Promise<UbicacionEntity[]> {
        return Array.from(this.ubicaciones.values())
            .filter(u => u.ciudad.toLowerCase().includes(ciudad.toLowerCase()));
    }

    async findByCapacidad(minCapacidad: number): Promise<UbicacionEntity[]> {
        return Array.from(this.ubicaciones.values())
            .filter(u => u.capacidad >= minCapacidad)
            .sort((a, b) => b.capacidad - a.capacidad);
    }

    async findCercanas(lat: number, lng: number, radioKm: number = 10): Promise<UbicacionEntity[]> {
        const ubicaciones = Array.from(this.ubicaciones.values());
        return ubicaciones.filter(u => {
            const distancia = this.calcularDistancia(lat, lng, Number(u.latitud), Number(u.longitud));
            return distancia <= radioKm;
        });
    }

    private calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
