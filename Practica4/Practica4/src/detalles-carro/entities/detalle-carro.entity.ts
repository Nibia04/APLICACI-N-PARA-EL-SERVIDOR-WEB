import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CarritoCompra } from '../../carritos-compra/entities/carrito-compra.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('detalles_carro')
export class DetalleCarro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2, nullable: false })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_agregado' })
  fechaAgregado: Date;

  @ManyToOne(() => CarritoCompra, { nullable: false })
  @JoinColumn({ name: 'carrito_id' })
  carrito: CarritoCompra;

  @Column({ name: 'carrito_id' })
  carritoId: number;

  @ManyToOne(() => Producto, { nullable: false })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;
}
