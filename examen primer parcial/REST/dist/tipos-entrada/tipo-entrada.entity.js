"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoEntrada = void 0;
class TipoEntrada {
    static crear(id, nombre, precioBase, cantidad, eventoId) {
        return {
            id,
            nombre,
            precioBase,
            cantidad,
            eventoId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
exports.TipoEntrada = TipoEntrada;
//# sourceMappingURL=tipo-entrada.entity.js.map