import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, IsNumber, IsBoolean, Min, Matches } from 'class-validator';

export class CreateTarjetaVirtualDto {
  @IsNotEmpty({ message: 'El número de tarjeta es requerido' })
  @IsString({ message: 'El número de tarjeta debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El número de tarjeta no puede exceder 20 caracteres' })
  @MinLength(13, { message: 'El número de tarjeta debe tener al menos 13 caracteres' })
  numeroTarjeta: string;

  @IsNotEmpty({ message: 'El nombre del titular es requerido' })
  @IsString({ message: 'El nombre del titular debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre del titular no puede exceder 100 caracteres' })
  nombreTitular: string;

  @IsNotEmpty({ message: 'La fecha de expiración es requerida' })
  @IsString({ message: 'La fecha de expiración debe ser una cadena de texto' })
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, { message: 'La fecha de expiración debe tener el formato MM/YYYY' })
  fechaExpiracion: string;

  @IsNotEmpty({ message: 'El CVV es requerido' })
  @IsString({ message: 'El CVV debe ser una cadena de texto' })
  @MaxLength(4, { message: 'El CVV no puede exceder 4 caracteres' })
  @MinLength(3, { message: 'El CVV debe tener al menos 3 caracteres' })
  cvv: string;

  @IsOptional()
  @IsNumber({}, { message: 'El saldo debe ser un número' })
  @Min(0, { message: 'El saldo debe ser mayor o igual a 0' })
  saldo?: number;

  @IsOptional()
  @IsBoolean({ message: 'El estado activa debe ser un valor booleano' })
  activa?: boolean;

  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  clienteId: number;
}
