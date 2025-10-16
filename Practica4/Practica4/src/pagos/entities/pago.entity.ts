import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';
import { TarjetaVirtual } from '../../tarjetas-virtuales/entities/tarjeta-virtual.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  monto: number;

  @Column({ name: 'metodo_pago', length: 50, nullable: false })
  metodoPago: string; // tarjeta, efectivo, transferencia, etc.

  @Column({ length: 50, default: 'completado' })
  estado: string; // pendiente, completado, rechazado

  @Column({ name: 'codigo_transaccion', length: 100, nullable: true })
  codigoTransaccion: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'fecha_pago' })
  fechaPago: Date;

  @ManyToOne(() => Orden, { nullable: false })
  @JoinColumn({ name: 'orden_id' })
  orden: Orden;

  @Column({ name: 'orden_id' })
  ordenId: number;

  @ManyToOne(() => TarjetaVirtual, { nullable: true })
  @JoinColumn({ name: 'tarjeta_id' })
  tarjeta: TarjetaVirtual;

  @Column({ name: 'tarjeta_id', nullable: true })
  tarjetaId: number;
}
