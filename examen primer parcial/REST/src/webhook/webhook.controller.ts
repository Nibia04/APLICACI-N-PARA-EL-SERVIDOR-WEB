import { Controller, Post, Body } from '@nestjs/common';
import type { NotificacionWebhook } from './webhook.service';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(private webhookService: WebhookService) { }

    /**
     * Endpoint que recibe las notificaciones del REST
     * POST /webhook/notificaciones
     * 
     * Flujo:
     * 1. REST (crear/actualizar evento) → llama este endpoint
     * 2. Webhook Service procesa la notificación
     * 3. WebSocket Gateway emite a los clientes conectados
     */
    @Post('notificaciones')
    async recibirNotificacion(@Body() notificacion: NotificacionWebhook) {
        console.log('\n========================================');
        console.log('📨 WEBHOOK CONTROLLER - Notificación recibida');
        console.log('========================================');

        return this.webhookService.procesarNotificacion(notificacion);
    }

    /**
     * Endpoint auxiliar para pruebas manuales
     * POST /webhook/test
     */
    @Post('test')
    async testWebhook(@Body() datos: any) {
        console.log('\n========================================');
        console.log('🧪 WEBHOOK TEST');
        console.log('========================================');

        const notificacion: NotificacionWebhook = {
            tipo: datos.tipo || 'test',
            operacion: datos.operacion || 'test',
            datos: datos.datos || { mensaje: 'notificación de prueba' },
        };

        return this.webhookService.procesarNotificacion(notificacion);
    }
}
