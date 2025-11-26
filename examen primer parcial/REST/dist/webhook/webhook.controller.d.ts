import type { NotificacionWebhook } from './webhook.service';
import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private webhookService;
    constructor(webhookService: WebhookService);
    recibirNotificacion(notificacion: NotificacionWebhook): Promise<{
        success: boolean;
        mensaje: string;
        timestamp: Date;
    }>;
    testWebhook(datos: any): Promise<{
        success: boolean;
        mensaje: string;
        timestamp: Date;
    }>;
}
