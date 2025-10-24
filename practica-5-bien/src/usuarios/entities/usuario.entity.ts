import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({ description: 'Usuario del sistema' })
export class Usuario {
  @Field(() => Int, { description: 'ID único del usuario' })
  id: number;

  @Field({ description: 'Nombre del usuario' })
  nombre: string;

  @Field({ description: 'Apellido del usuario' })
  apellido: string;

  @Field({ description: 'Correo electrónico del usuario' })
  email: string;

  @Field({ nullable: true, description: 'Número de teléfono del usuario' })
  telefono?: string;

  @Field({ description: 'Rol del usuario (cliente, emprendedor, admin)' })
  rol: string;

  @Field({ description: 'Estado activo del usuario' })
  activo: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Fecha de creación del usuario' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}
