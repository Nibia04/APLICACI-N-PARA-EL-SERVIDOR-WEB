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
exports.EventosController = void 0;
const common_1 = require("@nestjs/common");
const eventos_service_1 = require("./eventos.service");
const create_evento_dto_1 = require("./dtos/create-evento.dto");
const update_evento_dto_1 = require("./dtos/update-evento.dto");
let EventosController = class EventosController {
    eventosService;
    constructor(eventosService) {
        this.eventosService = eventosService;
    }
    async create(createEventoDto) {
        return this.eventosService.create(createEventoDto);
    }
    async findAll() {
        return this.eventosService.findAll();
    }
    async findProximos() {
        return this.eventosService.findProximos();
    }
    async findByPriceRange(min, max) {
        return this.eventosService.findByPriceRange(parseFloat(min), parseFloat(max));
    }
    async findByArtista(nombre) {
        return this.eventosService.findByArtista(nombre);
    }
    async findOne(id) {
        return this.eventosService.findOne(id);
    }
    async update(id, updateEventoDto) {
        return this.eventosService.update(id, updateEventoDto);
    }
    async remove(id) {
        await this.eventosService.remove(id);
    }
};
exports.EventosController = EventosController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_evento_dto_1.CreateEventoDto]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('proximos/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "findProximos", null);
__decorate([
    (0, common_1.Get)('precio/:min/:max'),
    __param(0, (0, common_1.Param)('min')),
    __param(1, (0, common_1.Param)('max')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "findByPriceRange", null);
__decorate([
    (0, common_1.Get)('artista/:nombre'),
    __param(0, (0, common_1.Param)('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "findByArtista", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_evento_dto_1.UpdateEventoDto]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventosController.prototype, "remove", null);
exports.EventosController = EventosController = __decorate([
    (0, common_1.Controller)('eventos'),
    __metadata("design:paramtypes", [eventos_service_1.EventosService])
], EventosController);
//# sourceMappingURL=eventos.controller.js.map