import { TiposEntradaService } from './tipos-entrada.service';
import { CreateTipoEntradaDto } from './dtos/create-tipo-entrada.dto';
import { UpdateTipoEntradaDto } from './dtos/update-tipo-entrada.dto';
export declare class TiposEntradaController {
    private readonly tiposEntradaService;
    constructor(tiposEntradaService: TiposEntradaService);
    create(createTipoEntradaDto: CreateTipoEntradaDto): Promise<import("./tipo-entrada.entity").TipoEntradaEntity>;
    findAll(): Promise<import("./tipo-entrada.entity").TipoEntradaEntity[]>;
    findByEvento(eventoId: string): Promise<import("./tipo-entrada.entity").TipoEntradaEntity[]>;
    findByPriceRange(min: string, max: string): Promise<import("./tipo-entrada.entity").TipoEntradaEntity[]>;
    findDisponibles(): Promise<import("./tipo-entrada.entity").TipoEntradaEntity[]>;
    findOne(id: string): Promise<import("./tipo-entrada.entity").TipoEntradaEntity>;
    update(id: string, updateTipoEntradaDto: UpdateTipoEntradaDto): Promise<import("./tipo-entrada.entity").TipoEntradaEntity>;
    reducirStock(id: string, cantidad: number): Promise<import("./tipo-entrada.entity").TipoEntradaEntity>;
    remove(id: string): Promise<void>;
}
