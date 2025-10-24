import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';

@ObjectType({ description: 'Orden de compra' })
export class Orden {
  @Field(() => Int, { description: 'ID único de la orden' })
  id: number;

  @Field({ description: 'Número de orden único' })
  numeroOrden: string;

  @Field(() => Float, { description: 'Total de la orden' })
  total: number;

  @Field({ description: 'Estado de la orden (pendiente, completado, cancelado)' })
  estado: string;

  @Field({ nullable: true, description: 'Observaciones adicionales de la orden' })
  observaciones?: string;

  @Field(() => GraphQLISODateTime, { description: 'Fecha en que se realizó la orden' })
  fechaOrden: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;

  @Field(() => Cliente, { nullable: true, description: 'Cliente que realizó la orden' })
  cliente?: Cliente;

  @Field(() => Int, { description: 'ID del cliente' })
  clienteId: number;
}
