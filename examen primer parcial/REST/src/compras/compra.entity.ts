// Importado del Dominio - PASO UNO
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

// Clase auxiliar con métodos estáticos del dominio
export class Compra {
    static crear(
        id: string,
        usuarioId: string,
        eventoId: string,
        precioTotal: number,
    ): CompraEntity {
        return {
            id,
            usuarioId,
            eventoId,
            precioTotal,
            estado: 'pendiente',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    static procesarPago(compra: CompraEntity, metodoPago: string): void {
        if (compra.estado === 'pendiente') {
            compra.estado = 'procesando' as any;
            compra.metodoPago = metodoPago;
        }
    }

    static confirmarPago(compra: CompraEntity): void {
        if (compra.estado === 'procesando') {
            compra.estado = 'pagado' as any;
            compra.fechaPago = new Date();
        }
    }

    static cancelar(compra: CompraEntity): void {
        if (compra.estado === 'pendiente' || compra.estado === 'procesando') {
            compra.estado = 'cancelado' as any;
        }
    }
}
