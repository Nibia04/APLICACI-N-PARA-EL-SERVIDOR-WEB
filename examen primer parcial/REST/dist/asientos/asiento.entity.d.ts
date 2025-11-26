export interface AsientoEntity {
    readonly id: string;
    fila: string;
    numero: number;
    precio: number;
    estado: 'disponible' | 'reservado' | 'ocupado';
    eventoId: string;
    tipoEntradaId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Asiento {
    static crear(id: string, fila: string, numero: number, precio: number, eventoId: string, tipoEntradaId: string): AsientoEntity;
    static reservar(asiento: AsientoEntity): void;
    static ocupar(asiento: AsientoEntity): void;
}
