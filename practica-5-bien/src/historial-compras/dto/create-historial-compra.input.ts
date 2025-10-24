import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateHistorialCompraInput {
  @Field(() => Float)
  total: number;

  @Field(() => String)
  estado: string;

  @Field(() => String, { nullable: true })
  observaciones?: string;

  @Field(() => Int)
  clienteId: number;

  @Field(() => Int)
  ordenId: number;
}
