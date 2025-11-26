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
exports.TiposEntradaController = void 0;
const common_1 = require("@nestjs/common");
const tipos_entrada_service_1 = require("./tipos-entrada.service");
const create_tipo_entrada_dto_1 = require("./dtos/create-tipo-entrada.dto");
const update_tipo_entrada_dto_1 = require("./dtos/update-tipo-entrada.dto");
let TiposEntradaController = class TiposEntradaController {
    tiposEntradaService;
    constructor(tiposEntradaService) {
        this.tiposEntradaService = tiposEntradaService;
    }
    async create(createTipoEntradaDto) {
        return this.tiposEntradaService.create(createTipoEntradaDto);
    }
    async findAll() {
        return this.tiposEntradaService.findAll();
    }
    async findByEvento(eventoId) {
        return this.tiposEntradaService.findByEvento(eventoId);
    }
    async findByPriceRange(min, max) {
        return this.tiposEntradaService.findByPriceRange(parseFloat(min), parseFloat(max));
    }
    async findDisponibles() {
        return this.tiposEntradaService.findDisponibles();
    }
    async findOne(id) {
        return this.tiposEntradaService.findOne(id);
    }
    async update(id, updateTipoEntradaDto) {
        return this.tiposEntradaService.update(id, updateTipoEntradaDto);
    }
    async reducirStock(id, cantidad) {
        return this.tiposEntradaService.reducirStock(id, cantidad);
    }
    async remove(id) {
        await this.tiposEntradaService.remove(id);
    }
};
exports.TiposEntradaController = TiposEntradaController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tipo_entrada_dto_1.CreateTipoEntradaDto]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('evento/:eventoId'),
    __param(0, (0, common_1.Param)('eventoId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "findByEvento", null);
__decorate([
    (0, common_1.Get)('precio/:min/:max'),
    __param(0, (0, common_1.Param)('min')),
    __param(1, (0, common_1.Param)('max')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "findByPriceRange", null);
__decorate([
    (0, common_1.Get)('disponibles/stock'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "findDisponibles", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tipo_entrada_dto_1.UpdateTipoEntradaDto]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/reducir-stock'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)('cantidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "reducirStock", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TiposEntradaController.prototype, "remove", null);
exports.TiposEntradaController = TiposEntradaController = __decorate([
    (0, common_1.Controller)('tipos-entrada'),
    __metadata("design:paramtypes", [tipos_entrada_service_1.TiposEntradaService])
], TiposEntradaController);
//# sourceMappingURL=tipos-entrada.controller.js.map