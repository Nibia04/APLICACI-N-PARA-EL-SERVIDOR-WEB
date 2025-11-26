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
exports.AsientosService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const webhook_service_1 = require("../webhook/webhook.service");
let AsientosService = class AsientosService {
    webhookService;
    asientos = new Map();
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async create(createAsientoDto) {
        const id = (0, uuid_1.v4)();
        const asiento = {
            ...createAsientoDto,
            id,
            estado: 'disponible',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.asientos.set(id, asiento);
        await this.webhookService.procesarCreacion('asiento', asiento, id);
        return asiento;
    }
    async findAll() {
        return Array.from(this.asientos.values());
    }
    async findOne(id) {
        const asiento = this.asientos.get(id);
        if (!asiento) {
            throw new common_1.NotFoundException(`Asiento con ID ${id} no encontrado`);
        }
        return asiento;
    }
    async update(id, updateAsientoDto) {
        const asiento = await this.findOne(id);
        const actualizado = {
            ...asiento,
            ...updateAsientoDto,
            estado: updateAsientoDto.estado ? updateAsientoDto.estado : asiento.estado,
            updatedAt: new Date(),
        };
        this.asientos.set(id, actualizado);
        return actualizado;
    }
    async remove(id) {
        await this.findOne(id);
        this.asientos.delete(id);
        await this.webhookService.procesarEliminacion('asiento', id);
    }
    async findDisponiblesPorEvento(eventoId) {
        return Array.from(this.asientos.values())
            .filter(a => a.eventoId === eventoId && a.estado === 'disponible');
    }
    async findByFila(fila) {
        return Array.from(this.asientos.values())
            .filter(a => a.fila === fila)
            .sort((a, b) => a.numero - b.numero);
    }
    async findByPriceRange(min, max) {
        return Array.from(this.asientos.values())
            .filter(a => a.precio >= min && a.precio <= max);
    }
    async reservar(id) {
        const asiento = await this.findOne(id);
        if (asiento.estado !== 'disponible') {
            throw new Error(`Asiento no está disponible`);
        }
        asiento.estado = 'reservado';
        asiento.updatedAt = new Date();
        this.asientos.set(id, asiento);
        return asiento;
    }
    async ocupar(id) {
        const asiento = await this.findOne(id);
        if (asiento.estado === 'ocupado') {
            throw new Error(`Asiento ya está ocupado`);
        }
        asiento.estado = 'ocupado';
        asiento.updatedAt = new Date();
        this.asientos.set(id, asiento);
        return asiento;
    }
};
exports.AsientosService = AsientosService;
exports.AsientosService = AsientosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], AsientosService);
//# sourceMappingURL=asientos.service.js.map