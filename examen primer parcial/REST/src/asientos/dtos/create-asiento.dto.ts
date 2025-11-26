import { IsString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateAsientoDto {
    @IsString()
    @IsNotEmpty()
    fila: string;

    @IsNumber()
    @IsPositive()
    numero: number;

    @IsNumber()
    @IsPositive()
    precio: number;

    @IsUUID()
    @IsNotEmpty()
    eventoId: string;

    @IsUUID()
    @IsNotEmpty()
    tipoEntradaId: string;
}
