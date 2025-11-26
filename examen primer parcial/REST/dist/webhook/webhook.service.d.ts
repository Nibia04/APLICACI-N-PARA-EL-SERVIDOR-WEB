import { HttpService } from '@nestjs/axios';
export interface NotificacionWebhook {
    tipo: string;
    operacion: string;
    datos: any;
    entidad?: string;
}
export declare class WebhookService {
    private httpService;
    private webSocketServerUrl;
    constructor(httpService: HttpService);
    procesarNotificacion(notificacion: NotificacionWebhook): Promise<{
        success: boolean;
        mensaje: string;
        timestamp: Date;
    }>;
    procesarCreacion(tipo: string, datos: any, entidadId?: string): Promise<{
        success: boolean;
        mensaje: string;
        timestamp: Date;
    }>;
    procesarActualizacion(tipo: string, id: string, datos: any): Promise<{
        success: boolean;
        mensaje: string;
        timestamp: Date;
    }>;
    procesarEliminacion(tipo: string, id: string): Promise<{
        success: boolean;
        mensaje: string;
        timestamp: Date;
    }>;
}
