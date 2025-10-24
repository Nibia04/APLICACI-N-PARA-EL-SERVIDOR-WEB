import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  limit: number;
  offset: number;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef], { description: 'Lista de elementos' })
    items: T[];

    @Field(() => Int, { description: 'Total de registros disponibles' })
    total: number;

    @Field({ description: 'Indica si hay más registros disponibles' })
    hasMore: boolean;

    @Field(() => Int, { description: 'Límite aplicado en la consulta' })
    limit: number;

    @Field(() => Int, { description: 'Offset aplicado en la consulta' })
    offset: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
