"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsientosModule = void 0;
const common_1 = require("@nestjs/common");
const asientos_controller_1 = require("./asientos.controller");
const asientos_service_1 = require("./asientos.service");
const webhook_module_1 = require("../webhook/webhook.module");
let AsientosModule = class AsientosModule {
};
exports.AsientosModule = AsientosModule;
exports.AsientosModule = AsientosModule = __decorate([
    (0, common_1.Module)({
        imports: [webhook_module_1.WebhookModule],
        controllers: [asientos_controller_1.AsientosController],
        providers: [asientos_service_1.AsientosService],
        exports: [asientos_service_1.AsientosService],
    })
], AsientosModule);
//# sourceMappingURL=asientos.module.js.map