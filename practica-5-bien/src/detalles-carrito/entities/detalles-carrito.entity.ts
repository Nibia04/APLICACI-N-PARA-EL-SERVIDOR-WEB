import { ObjectType, Field, Int, Float, GraphQLISODateTime } from '@nestjs/graphql';
import { CarritoDeCompra } from '../../carrito-de-compras/entities/carrito-de-compra.entity';
import { Producto } from '../../productos/entities/producto.entity';

@ObjectType({ description: 'Detalle de productos en el carrito de compras' })
export class DetallesCarrito {
  @Field(() => Int, { description: 'ID único del detalle' })
  id: number;

  @Field(() => Int, { description: 'Cantidad de unidades del producto' })
  cantidad: number;

  @Field(() => Float, { description: 'Precio unitario del producto' })
  precioUnitario: number;

  @Field(() => Float, { description: 'Subtotal (cantidad × precio unitario)' })
  subtotal: number;

  @Field(() => GraphQLISODateTime, { description: 'Fecha en que se agregó el producto al carrito' })
  fechaAgregado: Date;

  @Field(() => CarritoDeCompra, { nullable: true, description: 'Carrito al que pertenece' })
  carrito?: CarritoDeCompra;

  @Field(() => Int, { description: 'ID del carrito' })
  carritoId: number;

  @Field(() => Producto, { nullable: true, description: 'Producto agregado al carrito' })
  producto?: Producto;

  @Field(() => Int, { description: 'ID del producto' })
  productoId: number;
}
