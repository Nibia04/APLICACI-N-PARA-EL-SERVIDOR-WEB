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
exports.TiposEntradaService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const webhook_service_1 = require("../webhook/webhook.service");
let TiposEntradaService = class TiposEntradaService {
    webhookService;
    tiposEntrada = new Map();
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async create(createTipoEntradaDto) {
        const id = (0, uuid_1.v4)();
        const tipoEntrada = {
            ...createTipoEntradaDto,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.tiposEntrada.set(id, tipoEntrada);
        await this.webhookService.procesarCreacion('tipo-entrada', tipoEntrada, id);
        return tipoEntrada;
    }
    async findAll() {
        return Array.from(this.tiposEntrada.values());
    }
    async findOne(id) {
        const tipoEntrada = this.tiposEntrada.get(id);
        if (!tipoEntrada) {
            throw new common_1.NotFoundException(`Tipo de entrada con ID ${id} no encontrado`);
        }
        return tipoEntrada;
    }
    async update(id, updateTipoEntradaDto) {
        const tipoEntrada = await this.findOne(id);
        const actualizado = {
            ...tipoEntrada,
            ...updateTipoEntradaDto,
            updatedAt: new Date(),
        };
        this.tiposEntrada.set(id, actualizado);
        return actualizado;
    }
    async remove(id) {
        await this.findOne(id);
        this.tiposEntrada.delete(id);
        await this.webhookService.procesarEliminacion('tipo-entrada', id);
    }
    async findByEvento(eventoId) {
        return Array.from(this.tiposEntrada.values())
            .filter(t => t.eventoId === eventoId);
    }
    async findByPriceRange(min, max) {
        return Array.from(this.tiposEntrada.values())
            .filter(t => t.precioBase >= min && t.precioBase <= max);
    }
    async findDisponibles() {
        return Array.from(this.tiposEntrada.values())
            .filter(t => t.cantidad > 0);
    }
    async reducirStock(id, cantidad) {
        const tipoEntrada = await this.findOne(id);
        if (tipoEntrada.cantidad < cantidad) {
            throw new Error(`Stock insuficiente`);
        }
        tipoEntrada.cantidad -= cantidad;
        tipoEntrada.updatedAt = new Date();
        this.tiposEntrada.set(id, tipoEntrada);
        return tipoEntrada;
    }
};
exports.TiposEntradaService = TiposEntradaService;
exports.TiposEntradaService = TiposEntradaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], TiposEntradaService);
//# sourceMappingURL=tipos-entrada.service.js.map