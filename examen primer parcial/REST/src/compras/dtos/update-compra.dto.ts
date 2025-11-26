import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum EstadoCompraEnum {
    pendiente = 'pendiente',
    procesando = 'procesando',
    pagado = 'pagado',
    cancelado = 'cancelado',
}

export class UpdateCompraDto {
    @IsEnum(EstadoCompraEnum)
    @IsOptional()
    estado?: EstadoCompraEnum;

    @IsString()
    @IsOptional()
    referencias?: string;
}
