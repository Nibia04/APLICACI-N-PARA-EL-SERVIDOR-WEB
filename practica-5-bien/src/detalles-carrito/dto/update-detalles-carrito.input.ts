import { CreateDetallesCarritoInput } from './create-detalles-carrito.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDetallesCarritoInput extends PartialType(CreateDetallesCarritoInput) {
  @Field(() => Int)
  id: number;
}
