"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const eventos_module_1 = require("./eventos/eventos.module");
const ubicaciones_module_1 = require("./ubicaciones/ubicaciones.module");
const asientos_module_1 = require("./asientos/asientos.module");
const tipos_entrada_module_1 = require("./tipos-entrada/tipos-entrada.module");
const compras_module_1 = require("./compras/compras.module");
const webhook_module_1 = require("./webhook/webhook.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            webhook_module_1.WebhookModule,
            eventos_module_1.EventosModule,
            ubicaciones_module_1.UbicacionesModule,
            asientos_module_1.AsientosModule,
            tipos_entrada_module_1.TiposEntradaModule,
            compras_module_1.ComprasModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map