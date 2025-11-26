// Importado del Dominio - PASO UNO
// Domain Model
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

// Clase auxiliar con métodos estáticos del dominio
export class Ubicacion {
    static crear(
        id: string,
        nombre: string,
        ciudad: string,
        pais: string,
        latitud: number,
        longitud: number,
        capacidad: number,
        direccion: string,
    ): UbicacionEntity {
        return {
            id,
            nombre,
            ciudad,
            pais,
            latitud,
            longitud,
            capacidad,
            direccion,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
