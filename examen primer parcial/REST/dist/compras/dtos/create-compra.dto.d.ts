export declare enum MetodoPagoEnum {
    TARJETA = "TARJETA",
    EFECTIVO = "EFECTIVO",
    TRANSFERENCIA = "TRANSFERENCIA",
    BILLETERA_DIGITAL = "BILLETERA_DIGITAL"
}
export declare class CreateCompraDto {
    usuarioId: string;
    metodoPago: MetodoPagoEnum;
    asientoIds: string[];
    eventoId: string;
}
