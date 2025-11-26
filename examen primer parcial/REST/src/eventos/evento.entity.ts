// Importado del Dominio - PASO UNO
// Domain Model - Sin dependencias de framework
export interface EventoEntity {
    readonly id: string;
    nombre: string;
    artista: string;
    fecha: Date;
    hora: string;
    imagen: string | null;
    precioBase: number;
    capacidadTotal: number;
    estado: 'activo' | 'cancelado' | 'finalizado';
    ubicacionId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Clase auxiliar con métodos estáticos del dominio
export class Evento {
    static crear(
        id: string,
        nombre: string,
        artista: string,
        fecha: Date,
        hora: string,
        precioBase: number,
        capacidadTotal: number,
        ubicacionId: string,
    ): EventoEntity {
        return {
            id,
            nombre,
            artista,
            fecha,
            hora,
            imagen: null,
            precioBase,
            capacidadTotal,
            estado: 'activo',
            ubicacionId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    static cancelar(evento: EventoEntity): void {
        evento.estado = 'cancelado' as any;
    }

    static finalizar(evento: EventoEntity): void {
        evento.estado = 'finalizado' as any;
    }

    static cambiarNombre(evento: EventoEntity, nombre: string): void {
        evento.nombre = nombre;
    }
}
