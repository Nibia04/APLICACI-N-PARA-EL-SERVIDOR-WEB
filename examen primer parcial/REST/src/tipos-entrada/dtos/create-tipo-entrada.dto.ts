import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateTipoEntradaDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @IsPositive()
    precioBase: number;

    @IsNumber()
    @IsPositive()
    cantidad: number;

    @IsUUID()
    @IsNotEmpty()
    eventoId: string;
}
