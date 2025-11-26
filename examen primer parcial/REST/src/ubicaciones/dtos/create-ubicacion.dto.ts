import { IsString, IsNotEmpty, IsLatitude, IsLongitude, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateUbicacionDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    ciudad: string;

    @IsString()
    @IsNotEmpty()
    pais: string;

    @IsLatitude()
    latitud: number;

    @IsLongitude()
    longitud: number;

    @IsNumber()
    @IsPositive()
    capacidad: number;

    @IsString()
    @IsNotEmpty()
    direccion: string;
}
