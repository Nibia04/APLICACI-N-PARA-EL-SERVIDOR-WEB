import { AsientoEntity } from './asiento.entity';
import { CreateAsientoDto } from './dtos/create-asiento.dto';
import { UpdateAsientoDto } from './dtos/update-asiento.dto';
import { WebhookService } from '../webhook/webhook.service';
export declare class AsientosService {
    private webhookService;
    private asientos;
    constructor(webhookService: WebhookService);
    create(createAsientoDto: CreateAsientoDto): Promise<AsientoEntity>;
    findAll(): Promise<AsientoEntity[]>;
    findOne(id: string): Promise<AsientoEntity>;
    update(id: string, updateAsientoDto: UpdateAsientoDto): Promise<AsientoEntity>;
    remove(id: string): Promise<void>;
    findDisponiblesPorEvento(eventoId: string): Promise<AsientoEntity[]>;
    findByFila(fila: string): Promise<AsientoEntity[]>;
    findByPriceRange(min: number, max: number): Promise<AsientoEntity[]>;
    reservar(id: string): Promise<AsientoEntity>;
    ocupar(id: string): Promise<AsientoEntity>;
}
