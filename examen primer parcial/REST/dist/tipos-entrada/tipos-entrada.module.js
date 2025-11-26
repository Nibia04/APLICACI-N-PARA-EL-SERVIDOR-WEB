"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposEntradaModule = void 0;
const common_1 = require("@nestjs/common");
const tipos_entrada_controller_1 = require("./tipos-entrada.controller");
const tipos_entrada_service_1 = require("./tipos-entrada.service");
const webhook_module_1 = require("../webhook/webhook.module");
let TiposEntradaModule = class TiposEntradaModule {
};
exports.TiposEntradaModule = TiposEntradaModule;
exports.TiposEntradaModule = TiposEntradaModule = __decorate([
    (0, common_1.Module)({
        imports: [webhook_module_1.WebhookModule],
        controllers: [tipos_entrada_controller_1.TiposEntradaController],
        providers: [tipos_entrada_service_1.TiposEntradaService],
        exports: [tipos_entrada_service_1.TiposEntradaService],
    })
], TiposEntradaModule);
//# sourceMappingURL=tipos-entrada.module.js.map