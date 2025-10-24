import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';

@ObjectType({ description: 'Tarjeta virtual de pago del cliente' })
export class TarjetaVirtual {
  @Field(() => Int, { description: 'ID único de la tarjeta' })
  id: number;

  @Field({ description: 'Número de tarjeta' })
  numeroTarjeta: string;

  @Field({ description: 'Nombre del titular de la tarjeta' })
  nombreTitular: string;

  @Field({ description: 'Fecha de expiración de la tarjeta' })
  fechaExpiracion: string;

  @Field({ description: 'Código CVV de seguridad' })
  cvv: string;

  @Field(() => Float, { description: 'Saldo disponible en la tarjeta' })
  saldo: number;

  @Field({ description: 'Estado activo de la tarjeta' })
  activa: boolean;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de creación de la tarjeta' })
  fechaCreacion: Date;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de última actualización' })
  fechaActualizacion: Date;

  @Field(() => Cliente, { nullable: true, description: 'Cliente propietario de la tarjeta' })
  cliente?: Cliente;

  @Field(() => Int, { description: 'ID del cliente' })
  clienteId: number;
}
