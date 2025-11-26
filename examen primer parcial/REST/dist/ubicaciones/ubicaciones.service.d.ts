import { UbicacionEntity } from './ubicacion.entity';
import { CreateUbicacionDto } from './dtos/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dtos/update-ubicacion.dto';
import { WebhookService } from '../webhook/webhook.service';
export declare class UbicacionesService {
    private webhookService;
    private ubicaciones;
    constructor(webhookService: WebhookService);
    create(createUbicacionDto: CreateUbicacionDto): Promise<UbicacionEntity>;
    findAll(): Promise<UbicacionEntity[]>;
    findOne(id: string): Promise<UbicacionEntity>;
    update(id: string, updateUbicacionDto: UpdateUbicacionDto): Promise<UbicacionEntity>;
    remove(id: string): Promise<void>;
    findByCiudad(ciudad: string): Promise<UbicacionEntity[]>;
    findByCapacidad(minCapacidad: number): Promise<UbicacionEntity[]>;
    findCercanas(lat: number, lng: number, radioKm?: number): Promise<UbicacionEntity[]>;
    private calcularDistancia;
}
