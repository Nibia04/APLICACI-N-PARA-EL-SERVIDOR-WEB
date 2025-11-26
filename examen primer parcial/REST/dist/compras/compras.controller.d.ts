import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dtos/create-compra.dto';
import { UpdateCompraDto } from './dtos/update-compra.dto';
export declare class ComprasController {
    private readonly comprasService;
    constructor(comprasService: ComprasService);
    create(createCompraDto: CreateCompraDto): Promise<import("./compra.entity").CompraEntity>;
    findAll(): Promise<import("./compra.entity").CompraEntity[]>;
    findByUsuario(usuarioId: string): Promise<import("./compra.entity").CompraEntity[]>;
    findByEvento(eventoId: string): Promise<import("./compra.entity").CompraEntity[]>;
    findPendientes(): Promise<import("./compra.entity").CompraEntity[]>;
    findOne(id: string): Promise<import("./compra.entity").CompraEntity>;
    update(id: string, updateCompraDto: UpdateCompraDto): Promise<import("./compra.entity").CompraEntity>;
    procesarPago(id: string, numeroTransaccion: string): Promise<import("./compra.entity").CompraEntity>;
    confirmarCompra(id: string): Promise<import("./compra.entity").CompraEntity>;
    cancelarCompra(id: string): Promise<import("./compra.entity").CompraEntity>;
    obtenerVentasTotales(eventoId: string): Promise<{
        total: number;
        cantidad: number;
    }>;
    remove(id: string): Promise<void>;
}
