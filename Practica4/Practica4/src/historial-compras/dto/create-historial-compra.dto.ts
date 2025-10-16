import { IsNotEmpty, IsOptional, IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateHistorialCompraDto {
  @IsNotEmpty({ message: 'El total es requerido' })
  @IsNumber({}, { message: 'El total debe ser un número' })
  @Min(0, { message: 'El total debe ser mayor o igual a 0' })
  total: number;

  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El estado no puede exceder 50 caracteres' })
  estado: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser una cadena de texto' })
  observaciones?: string;

  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  clienteId: number;

  @IsNotEmpty({ message: 'El ID de la orden es requerido' })
  @IsNumber({}, { message: 'El ID de la orden debe ser un número' })
  ordenId: number;
}
