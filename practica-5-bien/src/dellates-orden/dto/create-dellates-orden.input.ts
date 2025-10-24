import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateDellatesOrdenInput {
  @Field(() => Int)
  cantidad: number;

  @Field(() => Float)
  precioUnitario: number;

  @Field(() => Float)
  subtotal: number;

  @Field(() => Int)
  ordenId: number;

  @Field(() => Int)
  productoId: number;
}
