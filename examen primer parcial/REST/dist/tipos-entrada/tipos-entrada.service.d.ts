import { TipoEntradaEntity } from './tipo-entrada.entity';
import { CreateTipoEntradaDto } from './dtos/create-tipo-entrada.dto';
import { UpdateTipoEntradaDto } from './dtos/update-tipo-entrada.dto';
import { WebhookService } from '../webhook/webhook.service';
export declare class TiposEntradaService {
    private webhookService;
    private tiposEntrada;
    constructor(webhookService: WebhookService);
    create(createTipoEntradaDto: CreateTipoEntradaDto): Promise<TipoEntradaEntity>;
    findAll(): Promise<TipoEntradaEntity[]>;
    findOne(id: string): Promise<TipoEntradaEntity>;
    update(id: string, updateTipoEntradaDto: UpdateTipoEntradaDto): Promise<TipoEntradaEntity>;
    remove(id: string): Promise<void>;
    findByEvento(eventoId: string): Promise<TipoEntradaEntity[]>;
    findByPriceRange(min: number, max: number): Promise<TipoEntradaEntity[]>;
    findDisponibles(): Promise<TipoEntradaEntity[]>;
    reducirStock(id: string, cantidad: number): Promise<TipoEntradaEntity>;
}
