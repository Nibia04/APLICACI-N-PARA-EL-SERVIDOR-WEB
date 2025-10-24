import { CreateCarritoDeCompraInput } from './create-carrito-de-compra.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCarritoDeCompraInput extends PartialType(CreateCarritoDeCompraInput) {
  @Field(() => Int)
  id: number;
}
