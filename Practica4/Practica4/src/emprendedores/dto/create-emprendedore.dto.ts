import { IsNumber, IsString, IsOptional, IsBoolean, MaxLength, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateEmprendedorDto {
  @IsNotEmpty({ message: 'El nombre de la tienda es requerido' })
  @IsString({ message: 'El nombre de la tienda debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre de la tienda no puede exceder 100 caracteres' })
  nombreTienda: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcionTienda?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El rating debe ser un número' })
  @Min(0, { message: 'El rating mínimo es 0' })
  @Max(5, { message: 'El rating máximo es 5' })
  rating?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
  activo?: boolean;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  direccion?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  telefono?: string;

  @IsOptional()
  @IsString({ message: 'La imagen de la tienda debe ser una cadena de texto' })
  imagenTienda?: string;

  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  usuarioId: number;
}



