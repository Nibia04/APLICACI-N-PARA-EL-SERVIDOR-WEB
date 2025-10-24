import { CreateFavoritoInput } from './create-favorito.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFavoritoInput extends PartialType(CreateFavoritoInput) {
  @Field(() => Int)
  id: number;
}
