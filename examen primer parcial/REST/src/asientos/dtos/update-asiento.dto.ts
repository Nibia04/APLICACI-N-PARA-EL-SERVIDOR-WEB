import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class UpdateAsientoDto {
    @IsString()
    @IsOptional()
    fila?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    numero?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precio?: number;

    @IsString()
    @IsOptional()
    estado?: string;
}
