import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Emprendedor } from '../../emprendedores/entities/emprendedore.entity';

@ObjectType({ description: 'Producto disponible en la tienda' })
export class Producto {
  @Field(() => Int, { description: 'ID único del producto' })
  id: number;

  @Field({ description: 'Nombre del producto' })
  nombre: string;

  @Field({ nullable: true, description: 'Descripción detallada del producto' })
  descripcion?: string;

  @Field(() => Float, { description: 'Precio del producto' })
  precio: number;

  @Field(() => Int, { description: 'Cantidad disponible en stock' })
  stock: number;

  @Field(() => Float, { description: 'Calificación promedio (0-5)' })
  rating: number;

  @Field({ description: 'Indica si el producto está disponible para la venta' })
  disponible: boolean;

  @Field({ nullable: true, description: 'URL de la imagen del producto' })
  imagen?: string;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de creación del producto' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;

  @Field(() => Categoria, { nullable: true, description: 'Categoría a la que pertenece el producto' })
  categoria?: Categoria;

  @Field(() => Int, { description: 'ID de la categoría' })
  categoriaId: number;

  @Field(() => Emprendedor, { nullable: true, description: 'Emprendedor que vende el producto' })
  emprendedor?: Emprendedor;

  @Field(() => Int, { description: 'ID del emprendedor' })
  emprendedorId: number;
}
