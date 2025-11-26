export interface CompraEntity {
    readonly id: string;
    usuarioId: string;
    eventoId: string;
    precioTotal: number;
    estado: 'pendiente' | 'procesando' | 'pagado' | 'cancelado';
    metodoPago?: string;
    referencias?: string;
    fechaPago?: Date;
    asientoIds?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Compra {
    static crear(id: string, usuarioId: string, eventoId: string, precioTotal: number): CompraEntity;
    static procesarPago(compra: CompraEntity, metodoPago: string): void;
    static confirmarPago(compra: CompraEntity): void;
    static cancelar(compra: CompraEntity): void;
}
