import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrdeneInput {
  @Field()
  numeroOrden: string;

  @Field(() => Float)
  total: number;

  @Field({ defaultValue: 'pendiente' })
  estado?: string;

  @Field({ nullable: true })
  observaciones?: string;

  @Field(() => Int)
  clienteId: number;
}
