import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';

@ObjectType({ description: 'Carrito de compras del cliente' })
export class CarritoDeCompra {
  @Field(() => Int, { description: 'ID único del carrito' })
  id: number;

  @Field(() => Float, { description: 'Total acumulado en el carrito' })
  total: number;

  @Field({ description: 'Estado activo del carrito' })
  activo: boolean;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de creación del carrito' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;

  @Field(() => Cliente, { nullable: true, description: 'Cliente propietario del carrito' })
  cliente?: Cliente;

  @Field(() => Int, { description: 'ID del cliente' })
  clienteId: number;
}