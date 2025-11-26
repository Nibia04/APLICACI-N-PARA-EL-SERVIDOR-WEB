import { IsUUID, IsNotEmpty, IsEnum, IsArray, ArrayMinSize } from 'class-validator';

export enum MetodoPagoEnum {
    TARJETA = 'TARJETA',
    EFECTIVO = 'EFECTIVO',
    TRANSFERENCIA = 'TRANSFERENCIA',
    BILLETERA_DIGITAL = 'BILLETERA_DIGITAL',
}

export class CreateCompraDto {
    @IsUUID()
    @IsNotEmpty()
    usuarioId: string;

    @IsEnum(MetodoPagoEnum)
    @IsNotEmpty()
    metodoPago: MetodoPagoEnum;

    @IsArray()
    @ArrayMinSize(1)
    asientoIds: string[];

    @IsUUID()
    @IsNotEmpty()
    eventoId: string;
}
