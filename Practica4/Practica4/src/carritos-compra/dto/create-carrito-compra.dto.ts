import { IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min } from 'class-validator';

export class CreateCarritoCompraDto {
  @IsOptional()
  @IsNumber({}, { message: 'El total debe ser un número' })
  @Min(0, { message: 'El total debe ser mayor o igual a 0' })
  total?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado activo debe ser un valor booleano' })
  activo?: boolean;

  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  clienteId: number;
}
