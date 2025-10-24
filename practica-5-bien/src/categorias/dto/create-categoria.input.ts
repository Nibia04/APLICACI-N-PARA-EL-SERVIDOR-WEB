import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoriaInput {
  @Field()
  nombre: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Boolean, { defaultValue: true })
  activo?: boolean;

  @Field({ nullable: true })
  imagen?: string;
}
