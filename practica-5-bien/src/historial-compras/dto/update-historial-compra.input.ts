import { CreateHistorialCompraInput } from './create-historial-compra.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHistorialCompraInput extends PartialType(CreateHistorialCompraInput) {
  @Field(() => Int)
  id: number;
}
