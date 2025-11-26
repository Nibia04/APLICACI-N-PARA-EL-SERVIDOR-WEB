export interface UbicacionEntity {
    readonly id: string;
    nombre: string;
    ciudad: string;
    pais: string;
    latitud: number;
    longitud: number;
    capacidad: number;
    direccion: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Ubicacion {
    static crear(id: string, nombre: string, ciudad: string, pais: string, latitud: number, longitud: number, capacidad: number, direccion: string): UbicacionEntity;
}
