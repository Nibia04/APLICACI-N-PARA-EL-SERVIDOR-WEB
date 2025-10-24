import { CreateOrdeneInput } from './create-ordene.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrdeneInput extends PartialType(CreateOrdeneInput) {
  @Field(() => Int)
  id: number;
}
