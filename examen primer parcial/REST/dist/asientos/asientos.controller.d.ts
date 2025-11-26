import { AsientosService } from './asientos.service';
import { CreateAsientoDto } from './dtos/create-asiento.dto';
import { UpdateAsientoDto } from './dtos/update-asiento.dto';
export declare class AsientosController {
    private readonly asientosService;
    constructor(asientosService: AsientosService);
    create(createAsientoDto: CreateAsientoDto): Promise<import("./asiento.entity").AsientoEntity>;
    findAll(): Promise<import("./asiento.entity").AsientoEntity[]>;
    findDisponiblesPorEvento(eventoId: string): Promise<import("./asiento.entity").AsientoEntity[]>;
    findByFila(fila: string): Promise<import("./asiento.entity").AsientoEntity[]>;
    findByPriceRange(min: string, max: string): Promise<import("./asiento.entity").AsientoEntity[]>;
    findOne(id: string): Promise<import("./asiento.entity").AsientoEntity>;
    update(id: string, updateAsientoDto: UpdateAsientoDto): Promise<import("./asiento.entity").AsientoEntity>;
    reservar(id: string): Promise<import("./asiento.entity").AsientoEntity>;
    ocupar(id: string): Promise<import("./asiento.entity").AsientoEntity>;
    remove(id: string): Promise<void>;
}
