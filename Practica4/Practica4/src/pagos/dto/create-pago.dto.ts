import { IsNotEmpty, IsOptional, IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreatePagoDto {
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  @Min(0, { message: 'El monto debe ser mayor o igual a 0' })
  monto: number;

  @IsNotEmpty({ message: 'El método de pago es requerido' })
  @IsString({ message: 'El método de pago debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El método de pago no puede exceder 50 caracteres' })
  metodoPago: string;

  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El estado no puede exceder 50 caracteres' })
  estado?: string;

  @IsOptional()
  @IsString({ message: 'El código de transacción debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El código de transacción no puede exceder 100 caracteres' })
  codigoTransaccion?: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser una cadena de texto' })
  observaciones?: string;

  @IsNotEmpty({ message: 'El ID de la orden es requerido' })
  @IsNumber({}, { message: 'El ID de la orden debe ser un número' })
  ordenId: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID de la tarjeta debe ser un número' })
  tarjetaId?: number;
}
