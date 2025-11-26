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
exports.EventosService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const webhook_service_1 = require("../webhook/webhook.service");
let EventosService = class EventosService {
    webhookService;
    eventos = new Map();
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async create(createEventoDto) {
        const id = (0, uuid_1.v4)();
        const evento = {
            ...createEventoDto,
            id,
            estado: 'activo',
            fecha: new Date(createEventoDto.fecha),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.eventos.set(id, evento);
        await this.webhookService.procesarCreacion('evento', evento, id);
        return evento;
    }
    async findAll() {
        return Array.from(this.eventos.values());
    }
    async findOne(id) {
        const evento = this.eventos.get(id);
        if (!evento) {
            throw new common_1.NotFoundException(`Evento con ID ${id} no encontrado`);
        }
        return evento;
    }
    async update(id, updateEventoDto) {
        const evento = await this.findOne(id);
        const actualizado = {
            ...evento,
            ...updateEventoDto,
            fecha: updateEventoDto.fecha ? new Date(updateEventoDto.fecha) : evento.fecha,
            estado: updateEventoDto.estado ? updateEventoDto.estado : evento.estado,
            updatedAt: new Date(),
        };
        this.eventos.set(id, actualizado);
        await this.webhookService.procesarActualizacion('evento', id, updateEventoDto);
        return actualizado;
    }
    async remove(id) {
        await this.findOne(id);
        this.eventos.delete(id);
        await this.webhookService.procesarEliminacion('evento', id);
    }
    async findProximos() {
        const hoy = new Date();
        return Array.from(this.eventos.values())
            .filter(e => new Date(e.fecha) > hoy)
            .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
            .slice(0, 10);
    }
    async findByPriceRange(min, max) {
        return Array.from(this.eventos.values())
            .filter(e => e.precioBase >= min && e.precioBase <= max);
    }
    async findByArtista(nombre) {
        return Array.from(this.eventos.values())
            .filter(e => e.artista.toLowerCase().includes(nombre.toLowerCase()));
    }
};
exports.EventosService = EventosService;
exports.EventosService = EventosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], EventosService);
//# sourceMappingURL=eventos.service.js.map