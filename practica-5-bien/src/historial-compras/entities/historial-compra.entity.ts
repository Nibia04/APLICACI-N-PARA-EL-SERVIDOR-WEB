import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Orden } from '../../ordenes/entities/ordene.entity';

@ObjectType({ description: 'Registro histórico de compras realizadas' })
export class HistorialCompra {
  @Field(() => Int, { description: 'ID único del registro' })
  id: number;

  @Field(() => Float, { description: 'Total de la compra' })
  total: number;

  @Field({ description: 'Estado de la compra (completado, cancelado, pendiente)' })
  estado: string;

  @Field({ nullable: true, description: 'Observaciones adicionales de la compra' })
  observaciones?: string;

  @Field(() => GraphQLISODateTime, { description: 'Fecha en que se realizó la compra' })
  fechaCompra: Date;

  @Field(() => Cliente, { nullable: true, description: 'Cliente que realizó la compra' })
  cliente?: Cliente;

  @Field(() => Int, { description: 'ID del cliente' })
  clienteId: number;

  @Field(() => Orden, { nullable: true, description: 'Orden asociada a la compra' })
  orden?: Orden;

  @Field(() => Int, { description: 'ID de la orden' })
  ordenId: number;
}
