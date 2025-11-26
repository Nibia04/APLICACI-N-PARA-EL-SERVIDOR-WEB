import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dtos/create-evento.dto';
import { UpdateEventoDto } from './dtos/update-evento.dto';
export declare class EventosController {
    private readonly eventosService;
    constructor(eventosService: EventosService);
    create(createEventoDto: CreateEventoDto): Promise<import("./evento.entity").EventoEntity>;
    findAll(): Promise<import("./evento.entity").EventoEntity[]>;
    findProximos(): Promise<import("./evento.entity").EventoEntity[]>;
    findByPriceRange(min: string, max: string): Promise<import("./evento.entity").EventoEntity[]>;
    findByArtista(nombre: string): Promise<import("./evento.entity").EventoEntity[]>;
    findOne(id: string): Promise<import("./evento.entity").EventoEntity>;
    update(id: string, updateEventoDto: UpdateEventoDto): Promise<import("./evento.entity").EventoEntity>;
    remove(id: string): Promise<void>;
}
