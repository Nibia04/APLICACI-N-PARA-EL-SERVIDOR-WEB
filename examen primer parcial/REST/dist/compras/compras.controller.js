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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComprasController = void 0;
const common_1 = require("@nestjs/common");
const compras_service_1 = require("./compras.service");
const create_compra_dto_1 = require("./dtos/create-compra.dto");
const update_compra_dto_1 = require("./dtos/update-compra.dto");
let ComprasController = class ComprasController {
    comprasService;
    constructor(comprasService) {
        this.comprasService = comprasService;
    }
    async create(createCompraDto) {
        return this.comprasService.create(createCompraDto);
    }
    async findAll() {
        return this.comprasService.findAll();
    }
    async findByUsuario(usuarioId) {
        return this.comprasService.findByUsuario(usuarioId);
    }
    async findByEvento(eventoId) {
        return this.comprasService.findByEvento(eventoId);
    }
    async findPendientes() {
        return this.comprasService.findPendientes();
    }
    async findOne(id) {
        return this.comprasService.findOne(id);
    }
    async update(id, updateCompraDto) {
        return this.comprasService.update(id, updateCompraDto);
    }
    async procesarPago(id, numeroTransaccion) {
        return this.comprasService.procesarPago(id, numeroTransaccion);
    }
    async confirmarCompra(id) {
        return this.comprasService.confirmarCompra(id);
    }
    async cancelarCompra(id) {
        return this.comprasService.cancelarCompra(id);
    }
    async obtenerVentasTotales(eventoId) {
        return this.comprasService.obtenerVentasTotales(eventoId);
    }
    async remove(id) {
        await this.comprasService.remove(id);
    }
};
exports.ComprasController = ComprasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_compra_dto_1.CreateCompraDto]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('usuario/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "findByUsuario", null);
__decorate([
    (0, common_1.Get)('evento/:eventoId'),
    __param(0, (0, common_1.Param)('eventoId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "findByEvento", null);
__decorate([
    (0, common_1.Get)('estado/pendientes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "findPendientes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_compra_dto_1.UpdateCompraDto]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/procesar-pago'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)('numeroTransaccion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "procesarPago", null);
__decorate([
    (0, common_1.Put)(':id/confirmar'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "confirmarCompra", null);
__decorate([
    (0, common_1.Put)(':id/cancelar'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "cancelarCompra", null);
__decorate([
    (0, common_1.Get)('evento/:eventoId/ventas-totales'),
    __param(0, (0, common_1.Param)('eventoId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "obtenerVentasTotales", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ComprasController.prototype, "remove", null);
exports.ComprasController = ComprasController = __decorate([
    (0, common_1.Controller)('compras'),
    __metadata("design:paramtypes", [compras_service_1.ComprasService])
], ComprasController);
//# sourceMappingURL=compras.controller.js.map