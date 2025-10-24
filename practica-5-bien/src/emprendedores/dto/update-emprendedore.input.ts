import { CreateEmprendedoreInput } from './create-emprendedore.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmprendedoreInput extends PartialType(CreateEmprendedoreInput) {
  @Field(() => Int)
  id: number;
}
