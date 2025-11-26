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
export declare class Evento {
    static crear(id: string, nombre: string, artista: string, fecha: Date, hora: string, precioBase: number, capacidadTotal: number, ubicacionId: string): EventoEntity;
    static cancelar(evento: EventoEntity): void;
    static finalizar(evento: EventoEntity): void;
    static cambiarNombre(evento: EventoEntity, nombre: string): void;
}
