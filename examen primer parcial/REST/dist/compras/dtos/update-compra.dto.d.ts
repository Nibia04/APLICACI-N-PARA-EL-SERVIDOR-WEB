export declare enum EstadoCompraEnum {
    pendiente = "pendiente",
    procesando = "procesando",
    pagado = "pagado",
    cancelado = "cancelado"
}
export declare class UpdateCompraDto {
    estado?: EstadoCompraEnum;
    referencias?: string;
}
