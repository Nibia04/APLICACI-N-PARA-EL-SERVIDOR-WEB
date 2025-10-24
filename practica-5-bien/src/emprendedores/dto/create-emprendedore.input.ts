import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateEmprendedoreInput {
  @Field()
  nombreTienda: string;

  @Field({ nullable: true })
  descripcionTienda?: string;

  @Field(() => Float, { defaultValue: 0 })
  rating?: number;

  @Field(() => Boolean, { defaultValue: true })
  activo?: boolean;

  @Field({ nullable: true })
  direccion?: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ nullable: true })
  imagenTienda?: string;

  @Field(() => Int)
  usuarioId: number;
}
