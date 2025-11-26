"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ubicacion = void 0;
class Ubicacion {
    static crear(id, nombre, ciudad, pais, latitud, longitud, capacidad, direccion) {
        return {
            id,
            nombre,
            ciudad,
            pais,
            latitud,
            longitud,
            capacidad,
            direccion,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }
}
exports.Ubicacion = Ubicacion;
//# sourceMappingURL=ubicacion.entity.js.map