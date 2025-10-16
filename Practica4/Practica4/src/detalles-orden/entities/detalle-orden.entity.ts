import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('detalles_orden')
export class DetalleOrden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  cantidad: number;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 10, scale: 2, nullable: false })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @ManyToOne(() => Orden, { nullable: false })
  @JoinColumn({ name: 'orden_id' })
  orden: Orden;

  @Column({ name: 'orden_id' })
  ordenId: number;

  @ManyToOne(() => Producto, { nullable: false })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column({ name: 'producto_id' })
  productoId: number;
}
