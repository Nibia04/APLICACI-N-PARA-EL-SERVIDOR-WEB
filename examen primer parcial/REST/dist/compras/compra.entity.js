"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compra = void 0;
class Compra {
    static crear(id, usuarioId, eventoId, precioTotal) {
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
    static procesarPago(compra, metodoPago) {
        if (compra.estado === 'pendiente') {
            compra.estado = 'procesando';
            compra.metodoPago = metodoPago;
        }
    }
    static confirmarPago(compra) {
        if (compra.estado === 'procesando') {
            compra.estado = 'pagado';
            compra.fechaPago = new Date();
        }
    }
    static cancelar(compra) {
        if (compra.estado === 'pendiente' || compra.estado === 'procesando') {
            compra.estado = 'cancelado';
        }
    }
}
exports.Compra = Compra;
//# sourceMappingURL=compra.entity.js.map