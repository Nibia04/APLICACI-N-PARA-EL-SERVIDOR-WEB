export interface TipoEntradaEntity {
    readonly id: string;
    nombre: string;
    precioBase: number;
    cantidad: number;
    eventoId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class TipoEntrada {
    static crear(id: string, nombre: string, precioBase: number, cantidad: number, eventoId: string): TipoEntradaEntity;
}
