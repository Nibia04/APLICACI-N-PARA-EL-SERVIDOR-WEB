"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evento = void 0;
class Evento {
    static crear(id, nombre, artista, fecha, hora, precioBase, capacidadTotal, ubicacionId) {
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
    static cancelar(evento) {
        evento.estado = 'cancelado';
    }
    static finalizar(evento) {
        evento.estado = 'finalizado';
    }
    static cambiarNombre(evento, nombre) {
        evento.nombre = nombre;
    }
}
exports.Evento = Evento;
//# sourceMappingURL=evento.entity.js.map