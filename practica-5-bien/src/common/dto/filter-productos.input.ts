import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType({ description: 'Filtros para búsqueda de productos' })
export class FilterProductosInput {
  @Field({ nullable: true, description: 'Buscar por nombre o descripción' })
  search?: string;

  @Field(() => Int, { nullable: true, description: 'Filtrar por categoría' })
  categoriaId?: number;

  @Field(() => Int, { nullable: true, description: 'Filtrar por emprendedor' })
  emprendedorId?: number;

  @Field(() => Float, { nullable: true, description: 'Precio mínimo' })
  precioMin?: number;

  @Field(() => Float, { nullable: true, description: 'Precio máximo' })
  precioMax?: number;

  @Field({ nullable: true, description: 'Solo productos disponibles', defaultValue: true })
  soloDisponibles?: boolean;

  @Field(() => Float, { nullable: true, description: 'Rating mínimo (0-5)' })
  ratingMin?: number;

  @Field({ nullable: true, description: 'Ordenar por: nombre, precio, rating, fechaCreacion' })
  ordenarPor?: string;

  @Field({ nullable: true, description: 'Dirección de orden: asc, desc', defaultValue: 'asc' })
  ordenDireccion?: string;
}
