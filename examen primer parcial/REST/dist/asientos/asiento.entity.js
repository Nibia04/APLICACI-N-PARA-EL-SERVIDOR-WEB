"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asiento = void 0;
class Asiento {
    static crear(id, fila, numero, precio, eventoId, tipoEntradaId) {
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
    static reservar(asiento) {
        if (asiento.estado === 'disponible') {
            asiento.estado = 'reservado';
        }
    }
    static ocupar(asiento) {
        if (asiento.estado === 'disponible' || asiento.estado === 'reservado') {
            asiento.estado = 'ocupado';
        }
    }
}
exports.Asiento = Asiento;
//# sourceMappingURL=asiento.entity.js.map