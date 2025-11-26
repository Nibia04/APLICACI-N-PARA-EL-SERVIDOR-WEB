import { UbicacionesService } from './ubicaciones.service';
import { CreateUbicacionDto } from './dtos/create-ubicacion.dto';
import { UpdateUbicacionDto } from './dtos/update-ubicacion.dto';
export declare class UbicacionesController {
    private readonly ubicacionesService;
    constructor(ubicacionesService: UbicacionesService);
    create(createUbicacionDto: CreateUbicacionDto): Promise<import("./ubicacion.entity").UbicacionEntity>;
    findAll(): Promise<import("./ubicacion.entity").UbicacionEntity[]>;
    findByCiudad(ciudad: string): Promise<import("./ubicacion.entity").UbicacionEntity[]>;
    findByCapacidad(minCapacidad: string): Promise<import("./ubicacion.entity").UbicacionEntity[]>;
    findCercanas(lat: string, lng: string, radio: string): Promise<import("./ubicacion.entity").UbicacionEntity[]>;
    findOne(id: string): Promise<import("./ubicacion.entity").UbicacionEntity>;
    update(id: string, updateUbicacionDto: UpdateUbicacionDto): Promise<import("./ubicacion.entity").UbicacionEntity>;
    remove(id: string): Promise<void>;
}
