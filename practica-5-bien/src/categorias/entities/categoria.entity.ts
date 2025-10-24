import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({ description: 'Categoría de productos' })
export class Categoria {
  @Field(() => Int, { description: 'ID único de la categoría' })
  id: number;

  @Field({ description: 'Nombre de la categoría' })
  nombre: string;

  @Field({ nullable: true, description: 'Descripción de la categoría' })
  descripcion?: string;

  @Field({ description: 'Estado activo de la categoría' })
  activo: boolean;

  @Field({ nullable: true, description: 'URL de la imagen de la categoría' })
  imagen?: string;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de creación' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;
}