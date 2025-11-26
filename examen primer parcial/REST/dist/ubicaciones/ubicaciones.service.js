"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionesService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const webhook_service_1 = require("../webhook/webhook.service");
let UbicacionesService = class UbicacionesService {
    webhookService;
    ubicaciones = new Map();
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async create(createUbicacionDto) {
        const id = (0, uuid_1.v4)();
        const ubicacion = {
            ...createUbicacionDto,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.ubicaciones.set(id, ubicacion);
        await this.webhookService.procesarCreacion('ubicacion', ubicacion, id);
        return ubicacion;
    }
    async findAll() {
        return Array.from(this.ubicaciones.values());
    }
    async findOne(id) {
        const ubicacion = this.ubicaciones.get(id);
        if (!ubicacion) {
            throw new common_1.NotFoundException(`Ubicación con ID ${id} no encontrada`);
        }
        return ubicacion;
    }
    async update(id, updateUbicacionDto) {
        const ubicacion = await this.findOne(id);
        const actualizado = {
            ...ubicacion,
            ...updateUbicacionDto,
            updatedAt: new Date(),
        };
        this.ubicaciones.set(id, actualizado);
        await this.webhookService.procesarActualizacion('ubicacion', id, updateUbicacionDto);
        return actualizado;
    }
    async remove(id) {
        await this.findOne(id);
        this.ubicaciones.delete(id);
        await this.webhookService.procesarEliminacion('ubicacion', id);
    }
    async findByCiudad(ciudad) {
        return Array.from(this.ubicaciones.values())
            .filter(u => u.ciudad.toLowerCase().includes(ciudad.toLowerCase()));
    }
    async findByCapacidad(minCapacidad) {
        return Array.from(this.ubicaciones.values())
            .filter(u => u.capacidad >= minCapacidad)
            .sort((a, b) => b.capacidad - a.capacidad);
    }
    async findCercanas(lat, lng, radioKm = 10) {
        const ubicaciones = Array.from(this.ubicaciones.values());
        return ubicaciones.filter(u => {
            const distancia = this.calcularDistancia(lat, lng, Number(u.latitud), Number(u.longitud));
            return distancia <= radioKm;
        });
    }
    calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
};
exports.UbicacionesService = UbicacionesService;
exports.UbicacionesService = UbicacionesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], UbicacionesService);
//# sourceMappingURL=ubicaciones.service.js.map