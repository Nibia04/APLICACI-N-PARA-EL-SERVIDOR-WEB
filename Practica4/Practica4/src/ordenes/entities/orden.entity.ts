import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_orden', unique: true, nullable: false })
  numeroOrden: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @Column({ length: 50, default: 'pendiente' })
  estado: string; // pendiente, procesando, enviado, entregado, cancelado

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'fecha_orden' })
  fechaOrden: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @ManyToOne(() => Cliente, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id' })
  clienteId: number;
}
