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
exports.AsientosController = void 0;
const common_1 = require("@nestjs/common");
const asientos_service_1 = require("./asientos.service");
const create_asiento_dto_1 = require("./dtos/create-asiento.dto");
const update_asiento_dto_1 = require("./dtos/update-asiento.dto");
let AsientosController = class AsientosController {
    asientosService;
    constructor(asientosService) {
        this.asientosService = asientosService;
    }
    async create(createAsientoDto) {
        return this.asientosService.create(createAsientoDto);
    }
    async findAll() {
        return this.asientosService.findAll();
    }
    async findDisponiblesPorEvento(eventoId) {
        return this.asientosService.findDisponiblesPorEvento(eventoId);
    }
    async findByFila(fila) {
        return this.asientosService.findByFila(fila);
    }
    async findByPriceRange(min, max) {
        return this.asientosService.findByPriceRange(parseFloat(min), parseFloat(max));
    }
    async findOne(id) {
        return this.asientosService.findOne(id);
    }
    async update(id, updateAsientoDto) {
        return this.asientosService.update(id, updateAsientoDto);
    }
    async reservar(id) {
        return this.asientosService.reservar(id);
    }
    async ocupar(id) {
        return this.asientosService.ocupar(id);
    }
    async remove(id) {
        await this.asientosService.remove(id);
    }
};
exports.AsientosController = AsientosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_asiento_dto_1.CreateAsientoDto]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('evento/:eventoId/disponibles'),
    __param(0, (0, common_1.Param)('eventoId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "findDisponiblesPorEvento", null);
__decorate([
    (0, common_1.Get)('fila/:fila'),
    __param(0, (0, common_1.Param)('fila')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "findByFila", null);
__decorate([
    (0, common_1.Get)('precio/:min/:max'),
    __param(0, (0, common_1.Param)('min')),
    __param(1, (0, common_1.Param)('max')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "findByPriceRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_asiento_dto_1.UpdateAsientoDto]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/reservar'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "reservar", null);
__decorate([
    (0, common_1.Put)(':id/ocupar'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "ocupar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AsientosController.prototype, "remove", null);
exports.AsientosController = AsientosController = __decorate([
    (0, common_1.Controller)('asientos'),
    __metadata("design:paramtypes", [asientos_service_1.AsientosService])
], AsientosController);
//# sourceMappingURL=asientos.controller.js.map