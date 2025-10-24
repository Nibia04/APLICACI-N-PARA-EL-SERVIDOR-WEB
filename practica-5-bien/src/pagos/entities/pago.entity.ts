import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Orden } from '../../ordenes/entities/ordene.entity';

@ObjectType({ description: 'Pago realizado por una orden' })
export class Pago {
  @Field(() => Int, { description: 'ID único del pago' })
  id: number;

  @Field(() => Float, { description: 'Monto total del pago' })
  monto: number;

  @Field({ description: 'Método de pago utilizado (tarjeta, efectivo, transferencia)' })
  metodoPago: string;

  @Field({ description: 'Estado del pago (pendiente, completado, fallido)' })
  estado: string;

  @Field({ nullable: true, description: 'Código único de transacción' })
  codigoTransaccion?: string;

  @Field({ nullable: true, description: 'Observaciones adicionales del pago' })
  observaciones?: string;

  @Field(() => GraphQLISODateTime, { description: 'Fecha en que se realizó el pago' })
  fechaPago: Date;

  @Field(() => Orden, { nullable: true, description: 'Orden asociada al pago' })
  orden?: Orden;

  @Field(() => Int, { description: 'ID de la orden' })
  ordenId: number;

  @Field(() => Int, { nullable: true, description: 'ID de la tarjeta utilizada' })
  tarjetaId?: number;
}
