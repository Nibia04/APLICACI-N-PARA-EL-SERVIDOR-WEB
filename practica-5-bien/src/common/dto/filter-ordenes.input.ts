import { InputType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';

@InputType({ description: 'Filtros para búsqueda de órdenes' })
export class FilterOrdenesInput {
  @Field(() => Int, { nullable: true, description: 'Filtrar por cliente' })
  clienteId?: number;

  @Field({ nullable: true, description: 'Filtrar por estado (pendiente, completado, cancelado)' })
  estado?: string;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Fecha inicial' })
  fechaInicio?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Fecha final' })
  fechaFin?: Date;

  @Field({ nullable: true, description: 'Buscar por número de orden' })
  numeroOrden?: string;

  @Field({ nullable: true, description: 'Ordenar por: fechaOrden, total', defaultValue: 'fechaOrden' })
  ordenarPor?: string;

  @Field({ nullable: true, description: 'Dirección de orden: asc, desc', defaultValue: 'desc' })
  ordenDireccion?: string;
}
