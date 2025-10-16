import { IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, Min, Max, IsBoolean } from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  precio: number;

  @IsOptional()
  @IsNumber({}, { message: 'El stock debe ser un número' })
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El rating debe ser un número' })
  @Min(0, { message: 'El rating mínimo es 0' })
  @Max(5, { message: 'El rating máximo es 5' })
  rating?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado disponible debe ser un valor booleano' })
  disponible?: boolean;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto' })
  imagen?: string;

  @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  categoriaId: number;

  @IsNotEmpty({ message: 'El ID del emprendedor es requerido' })
  @IsNumber({}, { message: 'El ID del emprendedor debe ser un número' })
  emprendedorId: number;
}
