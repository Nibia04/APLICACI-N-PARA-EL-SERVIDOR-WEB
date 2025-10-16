import { IsNotEmpty, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  nombre: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion?: string;

  @IsOptional()
  @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
  activo?: boolean;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto' })
  imagen?: string;
}
