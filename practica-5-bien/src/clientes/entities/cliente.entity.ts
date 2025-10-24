import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@ObjectType({ description: 'Cliente del sistema de ecommerce' })
export class Cliente {
  @Field(() => Int, { description: 'ID único del cliente' })
  id: number;

  @Field({ description: 'Nombre del cliente' })
  nombre: string;

  @Field({ description: 'Apellido del cliente' })
  apellido: string;

  @Field({ nullable: true, description: 'Dirección de residencia' })
  direccion?: string;

  @Field({ nullable: true, description: 'Número de teléfono de contacto' })
  telefono?: string;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Fecha de nacimiento' })
  fechaNacimiento?: Date;

  @Field({ description: 'Estado activo del cliente' })
  activo: boolean;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de creación del registro' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;

  @Field(() => Usuario, { nullable: true, description: 'Usuario asociado al cliente' })
  usuario?: Usuario;

  @Field(() => Int, { description: 'ID del usuario asociado' })
  usuarioId: number;
}
