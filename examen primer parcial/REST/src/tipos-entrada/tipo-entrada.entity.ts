// Importado del Dominio - PASO UNO
export interface TipoEntradaEntity {
    readonly id: string;
    nombre: string;
    precioBase: number;
    cantidad: number;
    eventoId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Clase auxiliar con métodos estáticos del dominio
export class TipoEntrada {
    static crear(
        id: string,
        nombre: string,
        precioBase: number,
        cantidad: number,
        eventoId: string,
    ): TipoEntradaEntity {
        return {
            id,
            nombre,
            precioBase,
            cantidad,
            eventoId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
