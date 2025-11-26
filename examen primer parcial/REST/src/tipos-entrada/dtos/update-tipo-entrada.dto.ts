import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateTipoEntradaDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precioBase?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    cantidad?: number;
}
