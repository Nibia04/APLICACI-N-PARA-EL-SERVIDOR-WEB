import { EventoEntity } from './evento.entity';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';
import { WebhookService } from '../webhook/webhook.service';
export declare class EventosService {
    private webhookService;
    private eventos;
    constructor(webhookService: WebhookService);
    create(createEventoDto: CreateEventoDto): Promise<EventoEntity>;
    findAll(): Promise<EventoEntity[]>;
    findOne(id: string): Promise<EventoEntity>;
    update(id: string, updateEventoDto: UpdateEventoDto): Promise<EventoEntity>;
    remove(id: string): Promise<void>;
    findProximos(): Promise<EventoEntity[]>;
    findByPriceRange(min: number, max: number): Promise<EventoEntity[]>;
    findByArtista(nombre: string): Promise<EventoEntity[]>;
}
