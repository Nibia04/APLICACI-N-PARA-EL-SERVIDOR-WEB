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
exports.UbicacionesController = void 0;
const common_1 = require("@nestjs/common");
const ubicaciones_service_1 = require("./ubicaciones.service");
const create_ubicacion_dto_1 = require("./dtos/create-ubicacion.dto");
const update_ubicacion_dto_1 = require("./dtos/update-ubicacion.dto");
let UbicacionesController = class UbicacionesController {
    ubicacionesService;
    constructor(ubicacionesService) {
        this.ubicacionesService = ubicacionesService;
    }
    async create(createUbicacionDto) {
        return this.ubicacionesService.create(createUbicacionDto);
    }
    async findAll() {
        return this.ubicacionesService.findAll();
    }
    async findByCiudad(ciudad) {
        return this.ubicacionesService.findByCiudad(ciudad);
    }
    async findByCapacidad(minCapacidad) {
        return this.ubicacionesService.findByCapacidad(parseInt(minCapacidad));
    }
    async findCercanas(lat, lng, radio) {
        return this.ubicacionesService.findCercanas(parseFloat(lat), parseFloat(lng), parseFloat(radio));
    }
    async findOne(id) {
        return this.ubicacionesService.findOne(id);
    }
    async update(id, updateUbicacionDto) {
        return this.ubicacionesService.update(id, updateUbicacionDto);
    }
    async remove(id) {
        await this.ubicacionesService.remove(id);
    }
};
exports.UbicacionesController = UbicacionesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ubicacion_dto_1.CreateUbicacionDto]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('ciudad/:ciudad'),
    __param(0, (0, common_1.Param)('ciudad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "findByCiudad", null);
__decorate([
    (0, common_1.Get)('capacidad/:minCapacidad'),
    __param(0, (0, common_1.Param)('minCapacidad')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "findByCapacidad", null);
__decorate([
    (0, common_1.Get)('cercanas/:lat/:lng/:radio'),
    __param(0, (0, common_1.Param)('lat')),
    __param(1, (0, common_1.Param)('lng')),
    __param(2, (0, common_1.Param)('radio')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "findCercanas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ubicacion_dto_1.UpdateUbicacionDto]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "remove", null);
exports.UbicacionesController = UbicacionesController = __decorate([
    (0, common_1.Controller)('ubicaciones'),
    __metadata("design:paramtypes", [ubicaciones_service_1.UbicacionesService])
], UbicacionesController);
//# sourceMappingURL=ubicaciones.controller.js.map