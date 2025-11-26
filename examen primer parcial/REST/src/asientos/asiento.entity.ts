// Importado del Dominio - PASO UNO
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

// Clase auxiliar con métodos estáticos del dominio
export class Asiento {
    static crear(
        id: string,
        fila: string,
        numero: number,
        precio: number,
        eventoId: string,
        tipoEntradaId: string,
    ): AsientoEntity {
        return {
            id,
            fila,
            numero,
            precio,
            estado: 'disponible',
            eventoId,
            tipoEntradaId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    static reservar(asiento: AsientoEntity): void {
        if (asiento.estado === 'disponible') {
            asiento.estado = 'reservado' as any;
        }
    }

    static ocupar(asiento: AsientoEntity): void {
        if (asiento.estado === 'disponible' || asiento.estado === 'reservado') {
            asiento.estado = 'ocupado' as any;
        }
    }
}
