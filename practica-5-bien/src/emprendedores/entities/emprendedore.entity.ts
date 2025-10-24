import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@ObjectType({ description: 'Emprendedor que vende productos en la plataforma' })
export class Emprendedor {
  @Field(() => Int, { description: 'ID único del emprendedor' })
  id: number;

  @Field({ description: 'Nombre de la tienda' })
  nombreTienda: string;

  @Field({ nullable: true, description: 'Descripción de la tienda' })
  descripcionTienda?: string;

  @Field(() => Float, { description: 'Calificación promedio del emprendedor (0-5)' })
  rating: number;

  @Field({ description: 'Estado activo del emprendedor' })
  activo: boolean;

  @Field({ nullable: true, description: 'Dirección de la tienda' })
  direccion?: string;

  @Field({ nullable: true, description: 'Teléfono de contacto' })
  telefono?: string;

  @Field({ nullable: true, description: 'URL de la imagen/logo de la tienda' })
  imagenTienda?: string;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de registro del emprendedor' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;

  @Field(() => Usuario, { nullable: true, description: 'Usuario asociado al emprendedor' })
  usuario?: Usuario;

  @Field(() => Int, { description: 'ID del usuario' })
  usuarioId: number;
}
