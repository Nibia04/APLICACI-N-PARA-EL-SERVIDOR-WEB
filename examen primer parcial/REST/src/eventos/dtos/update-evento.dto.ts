import { IsString, IsOptional, MinLength, MaxLength, IsISO8601, IsNumber, IsPositive } from 'class-validator';

export class UpdateEventoDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(100)
    nombre?: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    artista?: string;

    @IsISO8601()
    @IsOptional()
    fecha?: string;

    @IsString()
    @IsOptional()
    hora?: string;

    @IsString()
    @IsOptional()
    imagen?: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    precioBase?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    capacidadTotal?: number;

    @IsString()
    @IsOptional()
    estado?: string;
}
