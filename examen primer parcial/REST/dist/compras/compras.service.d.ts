import { CompraEntity } from './compra.entity';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
import { WebhookService } from '../webhook/webhook.service';
export declare class ComprasService {
    private webhookService;
    private compras;
    constructor(webhookService: WebhookService);
    create(createCompraDto: CreateCompraDto): Promise<CompraEntity>;
    findAll(): Promise<CompraEntity[]>;
    findOne(id: string): Promise<CompraEntity>;
    update(id: string, updateCompraDto: UpdateCompraDto): Promise<CompraEntity>;
    remove(id: string): Promise<void>;
    findByUsuario(usuarioId: string): Promise<CompraEntity[]>;
    findByEvento(eventoId: string): Promise<CompraEntity[]>;
    findPendientes(): Promise<CompraEntity[]>;
    procesarPago(id: string, numeroTransaccion: string): Promise<CompraEntity>;
    confirmarCompra(id: string): Promise<CompraEntity>;
    cancelarCompra(id: string): Promise<CompraEntity>;
    obtenerVentasTotales(eventoId: string): Promise<{
        total: number;
        cantidad: number;
    }>;
}
