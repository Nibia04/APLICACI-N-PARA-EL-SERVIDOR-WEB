import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { Orden } from '../../ordenes/entities/ordene.entity';
import { Producto } from '../../productos/entities/producto.entity';

@ObjectType({ description: 'Detalle de productos en una orden' })
export class DetalleOrden {
  @Field(() => Int, { description: 'ID único del detalle' })
  id: number;

  @Field(() => Int, { description: 'Cantidad de unidades del producto' })
  cantidad: number;

  @Field(() => Float, { description: 'Precio unitario del producto al momento de la orden' })
  precioUnitario: number;

  @Field(() => Float, { description: 'Subtotal (cantidad × precio unitario)' })
  subtotal: number;

  @Field(() => GraphQLISODateTime, { description: 'Fecha de creación del detalle' })
  fechaCreacion: Date;

  @Field(() => Orden, { nullable: true, description: 'Orden a la que pertenece' })
  orden?: Orden;

  @Field(() => Int, { description: 'ID de la orden' })
  ordenId: number;

  @Field(() => Producto, { nullable: true, description: 'Producto ordenado' })
  producto?: Producto;

  @Field(() => Int, { description: 'ID del producto' })
  productoId: number;
}
