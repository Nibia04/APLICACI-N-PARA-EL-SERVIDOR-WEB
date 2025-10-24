import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateCarritoDeCompraInput {
  @Field(() => Float, { defaultValue: 0 })
  total?: number;

  @Field(() => Boolean, { defaultValue: true })
  activo?: boolean;

  @Field(() => Int)
  clienteId: number;
}
