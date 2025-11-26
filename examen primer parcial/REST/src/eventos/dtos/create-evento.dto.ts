import { IsString, IsNotEmpty, MinLength, MaxLength, IsISO8601, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateEventoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    artista: string;

    @IsISO8601()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    hora: string;

    @IsString()
    @IsNotEmpty()
    imagen: string;

    @IsNumber()
    @IsPositive()
    precioBase: number;

    @IsNumber()
    @IsPositive()
    capacidadTotal: number;

    @IsUUID()
    @IsNotEmpty()
    ubicacionId: string;
}
