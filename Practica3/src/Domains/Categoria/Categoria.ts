import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity('categorias')
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombreCategoria!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descripcion?: string;

    // Relación Many-to-Many con Productos
    @ManyToMany('Producto', 'categorias')
    @JoinTable({
        name: 'categoria_producto',
        joinColumn: { name: 'idCategoria', referencedColumnName: 'idCategoria' },
        inverseJoinColumn: { name: 'idProducto', referencedColumnName: 'idProducto' }
    })
    productos?: any[];
}