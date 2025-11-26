import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface NotificacionWebhook {
    tipo: string; // 'evento', 'ubicacion', 'asiento', 'tipo-entrada', 'compra'
    operacion: string; // 'crear', 'actualizar', 'eliminar'
    datos: any;
    entidad?: string;
}

@Injectable()
export class WebhookService {
    private webSocketServerUrl = 'http://localhost:3001'; // WebSocket independiente en puerto 3001

    constructor(private httpService: HttpService) { }

    /**
     * Recibe notificación y la envía al WebSocket independiente vía HTTP
     * Flujo: REST → Webhook → HTTP → WebSocket
     */
    async procesarNotificacion(notificacion: NotificacionWebhook) {
        console.log('\n🔗 WEBHOOK - Recibida notificación:');
        console.log(`   Tipo: ${notificacion.tipo}`);
        console.log(`   Operación: ${notificacion.operacion}`);
        console.log(`   Datos:`, notificacion.datos);

        // Enviar al WebSocket independiente vía HTTP POST
        const eventoParaWebSocket = {
            id: Math.random().toString(36).substr(2, 9),
            tipo: notificacion.tipo,
            operacion: notificacion.operacion,
            datos: notificacion.datos,
            timestamp: new Date(),
        };

        try {
            console.log(`📤 Enviando al WebSocket en ${this.webSocketServerUrl}...`);

            const response = await firstValueFrom(
                this.httpService.post(
                    `${this.webSocketServerUrl}/webhook/evento`,
                    eventoParaWebSocket
                ).pipe(
                    catchError(error => {
                        console.log(`⚠️ WebSocket no disponible (${error.code}). Continuando...`);
                        throw error;
                    })
                )
            );

            console.log('✅ Evento enviado al WebSocket');
            return {
                success: true,
                mensaje: 'Notificación procesada y enviada al WebSocket',
                timestamp: new Date(),
            };
        } catch (error) {
            console.log('⚠️ WebSocket no disponible. Continuando sin él.');
            return {
                success: true,
                mensaje: 'Notificación procesada (WebSocket no disponible)',
                timestamp: new Date(),
            };
        }
    }

    /**
     * Procesa notificación de creación
     */
    async procesarCreacion(
        tipo: string,
        datos: any,
        entidadId?: string
    ) {
        const notificacion: NotificacionWebhook = {
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

    /**
     * Procesa notificación de actualización
     */
    async procesarActualizacion(
        tipo: string,
        id: string,
        datos: any
    ) {
        const notificacion: NotificacionWebhook = {
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

    /**
     * Procesa notificación de eliminación
     */
    async procesarEliminacion(tipo: string, id: string) {
        const notificacion: NotificacionWebhook = {
            tipo,
            operacion: 'eliminar',
            datos: {
                id,
            },
            entidad: tipo,
        };
        return this.procesarNotificacion(notificacion);
    }
}
