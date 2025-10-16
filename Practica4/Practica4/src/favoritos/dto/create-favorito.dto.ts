import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoritoDto {
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  clienteId: number;

  @IsNotEmpty({ message: 'El ID del producto es requerido' })
  @IsNumber({}, { message: 'El ID del producto debe ser un número' })
  productoId: number;
}
