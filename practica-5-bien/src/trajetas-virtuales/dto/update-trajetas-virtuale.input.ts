import { CreateTrajetasVirtualeInput } from './create-trajetas-virtuale.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTrajetasVirtualeInput extends PartialType(CreateTrajetasVirtualeInput) {
  @Field(() => Int)
  id: number;
}
