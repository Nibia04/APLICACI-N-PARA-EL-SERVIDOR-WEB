import { CreateDellatesOrdenInput } from './create-dellates-orden.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDellatesOrdenInput extends PartialType(CreateDellatesOrdenInput) {
  @Field(() => Int)
  id: number;
}
