import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreatePagoInput {
  @Field(() => Float)
  monto: number;

  @Field()
  metodoPago: string;

  @Field({ defaultValue: 'completado' })
  estado?: string;

  @Field({ nullable: true })
  codigoTransaccion?: string;

  @Field({ nullable: true })
  observaciones?: string;

  @Field(() => Int)
  ordenId: number;

  @Field(() => Int, { nullable: true })
  tarjetaId?: number;
}
