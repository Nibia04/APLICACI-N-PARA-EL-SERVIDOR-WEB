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
exports.CreateCompraDto = exports.MetodoPagoEnum = void 0;
const class_validator_1 = require("class-validator");
var MetodoPagoEnum;
(function (MetodoPagoEnum) {
    MetodoPagoEnum["TARJETA"] = "TARJETA";
    MetodoPagoEnum["EFECTIVO"] = "EFECTIVO";
    MetodoPagoEnum["TRANSFERENCIA"] = "TRANSFERENCIA";
    MetodoPagoEnum["BILLETERA_DIGITAL"] = "BILLETERA_DIGITAL";
})(MetodoPagoEnum || (exports.MetodoPagoEnum = MetodoPagoEnum = {}));
class CreateCompraDto {
    usuarioId;
    metodoPago;
    asientoIds;
    eventoId;
}
exports.CreateCompraDto = CreateCompraDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompraDto.prototype, "usuarioId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(MetodoPagoEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompraDto.prototype, "metodoPago", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateCompraDto.prototype, "asientoIds", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCompraDto.prototype, "eventoId", void 0);
//# sourceMappingURL=create-compra.dto.js.map