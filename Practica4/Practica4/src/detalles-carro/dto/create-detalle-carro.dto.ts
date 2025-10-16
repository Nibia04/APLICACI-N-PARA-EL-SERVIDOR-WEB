import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDetalleCarroDto {
  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad: number;

  @IsNotEmpty({ message: 'El precio unitario es requerido' })
  @IsNumber({}, { message: 'El precio unitario debe ser un número' })
  @Min(0, { message: 'El precio unitario debe ser mayor o igual a 0' })
  precioUnitario: number;

  @IsNotEmpty({ message: 'El subtotal es requerido' })
  @IsNumber({}, { message: 'El subtotal debe ser un número' })
  @Min(0, { message: 'El subtotal debe ser mayor o igual a 0' })
  subtotal: number;

  @IsNotEmpty({ message: 'El ID del carrito es requerido' })
  @IsNumber({}, { message: 'El ID del carrito debe ser un número' })
  carritoId: number;

  @IsNotEmpty({ message: 'El ID del producto es requerido' })
  @IsNumber({}, { message: 'El ID del producto debe ser un número' })
  productoId: number;
}
