import { IsString, IsOptional, IsLatitude, IsLongitude, IsNumber, IsPositive, MinLength } from 'class-validator';

export class UpdateUbicacionDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    nombre?: string;

    @IsString()
    @IsOptional()
    ciudad?: string;

    @IsString()
    @IsOptional()
    pais?: string;

    @IsLatitude()
    @IsOptional()
    latitud?: number;

    @IsLongitude()
    @IsOptional()
    longitud?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    capacidad?: number;

    @IsString()
    @IsOptional()
    direccion?: string;
}
