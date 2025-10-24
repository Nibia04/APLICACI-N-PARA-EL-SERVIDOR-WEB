import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsuarioInput {
  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ defaultValue: 'cliente' })
  rol?: string;

  @Field(() => Boolean, { defaultValue: true })
  activo?: boolean;
}
