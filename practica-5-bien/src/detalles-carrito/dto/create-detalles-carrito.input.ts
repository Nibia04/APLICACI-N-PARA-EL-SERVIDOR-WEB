import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateDetallesCarritoInput {
  @Field(() => Int)
  cantidad: number;

  @Field(() => Float)
  precioUnitario: number;

  @Field(() => Float)
  subtotal: number;

  @Field(() => Int)
  carritoId: number;

  @Field(() => Int)
  productoId: number;
}
