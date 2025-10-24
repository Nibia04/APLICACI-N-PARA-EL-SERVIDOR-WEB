import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTrajetasVirtualeInput {
  @Field(() => String)
  numeroTarjeta: string;

  @Field(() => String)
  nombreTitular: string;

  @Field(() => Date)
  fechaExpiracion: Date;

  @Field(() => String)
  cvv: string;

  @Field(() => Float, { defaultValue: 0 })
  saldo?: number;

  @Field(() => Boolean, { defaultValue: true })
  activa?: boolean;

  @Field(() => Int)
  clienteId: number;
}
