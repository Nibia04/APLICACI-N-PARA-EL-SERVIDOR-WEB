import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateClienteInput {
  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field({ nullable: true })
  direccion?: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ nullable: true })
  fechaNacimiento?: Date;

  @Field(() => Boolean, { defaultValue: true })
  activo?: boolean;

  @Field(() => Int)
  usuarioId: number;
}
