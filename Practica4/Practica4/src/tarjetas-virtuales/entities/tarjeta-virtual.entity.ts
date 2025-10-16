import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('tarjetas_virtuales')
export class TarjetaVirtual {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'numero_tarjeta', length: 20, unique: true, nullable: false })
  numeroTarjeta: string;

  @Column({ name: 'nombre_titular', length: 100, nullable: false })
  nombreTitular: string;

  @Column({ name: 'fecha_expiracion', type: 'varchar', length: 7, nullable: false })
  fechaExpiracion: string; // Formato MM/YYYY

  @Column({ length: 4, nullable: false })
  cvv: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  saldo: number;

  @Column({ type: 'boolean', default: true })
  activa: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @ManyToOne(() => Cliente, { nullable: false })
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ name: 'cliente_id' })
  clienteId: number;
}
