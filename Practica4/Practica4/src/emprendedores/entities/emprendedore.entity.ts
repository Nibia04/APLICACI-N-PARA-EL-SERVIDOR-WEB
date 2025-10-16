import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('emprendedores')
export class Emprendedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_tienda', length: 100, nullable: false })
  nombreTienda: string;

  @Column({ name: 'descripcion_tienda', type: 'text', nullable: true })
  descripcionTienda: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ length: 200, nullable: true })
  direccion: string;

  @Column({ length: 15, nullable: true })
  telefono: string;

  @Column({ name: 'imagen_tienda', length: 255, nullable: true })
  imagenTienda: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id' })
  usuarioId: number;
}

