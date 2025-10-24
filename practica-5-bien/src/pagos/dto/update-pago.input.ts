import { CreatePagoInput } from './create-pago.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePagoInput extends PartialType(CreatePagoInput) {
  @Field(() => Int)
  id: number;
}
