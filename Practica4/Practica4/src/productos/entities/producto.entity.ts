import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Emprendedor } from '../../emprendedores/entities/emprendedore.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  precio: number;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;

  @Column({ length: 255, nullable: true })
  imagen: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'categoria_id' })
  categoriaId: number;

  @ManyToOne(() => Emprendedor, { nullable: false })
  @JoinColumn({ name: 'emprendedor_id' })
  emprendedor: Emprendedor;

  @Column({ name: 'emprendedor_id' })
  emprendedorId: number;
}
