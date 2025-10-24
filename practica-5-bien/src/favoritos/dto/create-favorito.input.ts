import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFavoritoInput {
  @Field(() => Int)
  clienteId: number;

  @Field(() => Int)
  productoId: number;
}
