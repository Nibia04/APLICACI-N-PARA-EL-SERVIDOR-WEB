import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Orden } from '../../ordenes/entities/orden.entity';

@Entity('historial_compras')
export class HistorialCompra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @Column({ length: 50, nullable: false })
  estado: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @CreateDateColumn({ name: 'fecha_compra' })
  fechaCompra: Date;

  @ManyToOne(() => Cliente, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id' })
  clienteId: number;

  @ManyToOne(() => Orden, { nullable: false })
  @JoinColumn({ name: 'orden_id' })
  orden: Orden;

  @Column({ name: 'orden_id' })
  ordenId: number;
}
