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
exports.ComprasService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const webhook_service_1 = require("../webhook/webhook.service");
let ComprasService = class ComprasService {
    webhookService;
    compras = new Map();
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    async create(createCompraDto) {
        const id = (0, uuid_1.v4)();
        const compra = {
            ...createCompraDto,
            id,
            precioTotal: 0,
            estado: 'pendiente',
            referencias: '',
            fechaPago: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.compras.set(id, compra);
        await this.webhookService.procesarCreacion('compra', compra, id);
        return compra;
    }
    async findAll() {
        return Array.from(this.compras.values());
    }
    async findOne(id) {
        const compra = this.compras.get(id);
        if (!compra) {
            throw new common_1.NotFoundException(`Compra con ID ${id} no encontrada`);
        }
        return compra;
    }
    async update(id, updateCompraDto) {
        const compra = await this.findOne(id);
        const actualizado = {
            ...compra,
            ...updateCompraDto,
            estado: updateCompraDto.estado ? updateCompraDto.estado : compra.estado,
            updatedAt: new Date(),
        };
        this.compras.set(id, actualizado);
        return actualizado;
    }
    async remove(id) {
        await this.findOne(id);
        this.compras.delete(id);
        await this.webhookService.procesarEliminacion('compra', id);
    }
    async findByUsuario(usuarioId) {
        return Array.from(this.compras.values())
            .filter(c => c.usuarioId === usuarioId)
            .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    }
    async findByEvento(eventoId) {
        return Array.from(this.compras.values())
            .filter(c => c.eventoId === eventoId);
    }
    async findPendientes() {
        return Array.from(this.compras.values())
            .filter(c => c.estado === 'pendiente');
    }
    async procesarPago(id, numeroTransaccion) {
        const compra = await this.findOne(id);
        if (compra.estado !== 'pendiente') {
            throw new Error(`Compra no está en estado pendiente`);
        }
        compra.estado = 'procesando';
        compra.referencias = numeroTransaccion;
        compra.updatedAt = new Date();
        this.compras.set(id, compra);
        return compra;
    }
    async confirmarCompra(id) {
        const compra = await this.findOne(id);
        if (compra.estado !== 'procesando') {
            throw new Error(`Compra debe estar procesando para confirmar`);
        }
        compra.estado = 'pagado';
        compra.fechaPago = new Date();
        compra.updatedAt = new Date();
        this.compras.set(id, compra);
        return compra;
    }
    async cancelarCompra(id) {
        const compra = await this.findOne(id);
        if (compra.estado === 'pagado') {
            throw new Error(`No se puede cancelar compra pagada`);
        }
        compra.estado = 'cancelado';
        compra.updatedAt = new Date();
        this.compras.set(id, compra);
        return compra;
    }
    async obtenerVentasTotales(eventoId) {
        const compras = await this.findByEvento(eventoId);
        const ventasConfirmadas = compras.filter(c => c.estado === 'pagado');
        const total = ventasConfirmadas.reduce((sum, c) => sum + Number(c.precioTotal), 0);
        return { total, cantidad: ventasConfirmadas.length };
    }
};
exports.ComprasService = ComprasService;
exports.ComprasService = ComprasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], ComprasService);
//# sourceMappingURL=compras.service.js.map