import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Producto } from '../../productos/entities/producto.entity';

@ObjectType({ description: 'Producto marcado como favorito por un cliente' })
export class Favorito {
  @Field(() => Int, { description: 'ID único del favorito' })
  id: number;

  @Field(() => GraphQLISODateTime, { description: 'Fecha en que se agregó a favoritos' })
  fechaAgregado: Date;

  @Field(() => Cliente, { nullable: true, description: 'Cliente que marcó el favorito' })
  cliente?: Cliente;

  @Field(() => Int, { description: 'ID del cliente' })
  clienteId: number;

  @Field(() => Producto, { nullable: true, description: 'Producto marcado como favorito' })
  producto?: Producto;

  @Field(() => Int, { description: 'ID del producto' })
  productoId: number;
}
