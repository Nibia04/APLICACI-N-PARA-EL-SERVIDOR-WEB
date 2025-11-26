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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let WebhookService = class WebhookService {
    httpService;
    webSocketServerUrl = 'http://localhost:3001';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async procesarNotificacion(notificacion) {
        console.log('\n🔗 WEBHOOK - Recibida notificación:');
        console.log(`   Tipo: ${notificacion.tipo}`);
        console.log(`   Operación: ${notificacion.operacion}`);
        console.log(`   Datos:`, notificacion.datos);
        const eventoParaWebSocket = {
            id: Math.random().toString(36).substr(2, 9),
            tipo: notificacion.tipo,
            operacion: notificacion.operacion,
            datos: notificacion.datos,
            timestamp: new Date(),
        };
        try {
            console.log(`📤 Enviando al WebSocket en ${this.webSocketServerUrl}...`);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.webSocketServerUrl}/webhook/evento`, eventoParaWebSocket).pipe((0, rxjs_1.catchError)(error => {
                console.log(`⚠️ WebSocket no disponible (${error.code}). Continuando...`);
                throw error;
            })));
            console.log('✅ Evento enviado al WebSocket');
            return {
                success: true,
                mensaje: 'Notificación procesada y enviada al WebSocket',
                timestamp: new Date(),
            };
        }
        catch (error) {
            console.log('⚠️ WebSocket no disponible. Continuando sin él.');
            return {
                success: true,
                mensaje: 'Notificación procesada (WebSocket no disponible)',
                timestamp: new Date(),
            };
        }
    }
    async procesarCreacion(tipo, datos, entidadId) {
        const notificacion = {
            tipo,
            operacion: 'crear',
            datos: {
                ...datos,
                id: entidadId || datos.id,
            },
            entidad: tipo,
        };
        return this.procesarNotificacion(notificacion);
    }
    async procesarActualizacion(tipo, id, datos) {
        const notificacion = {
            tipo,
            operacion: 'actualizar',
            datos: {
                id,
                cambios: datos,
            },
            entidad: tipo,
        };
        return this.procesarNotificacion(notificacion);
    }
    async procesarEliminacion(tipo, id) {
        const notificacion = {
            tipo,
            operacion: 'eliminar',
            datos: {
                id,
            },
            entidad: tipo,
        };
        return this.procesarNotificacion(notificacion);
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map