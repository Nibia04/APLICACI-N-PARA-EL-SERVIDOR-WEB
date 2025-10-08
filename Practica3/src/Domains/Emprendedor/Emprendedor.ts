import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm";

@Entity('emprendedores')
export class Emprendedor {
    @PrimaryGeneratedColumn()
    idVendedor!: number;

    @Column({ type: 'integer', nullable: true })
    idUsuario?: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombreTienda!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descripcionTienda?: string;

    @Column({ type: 'float', nullable: true, default: 0.0 })
    rating?: number;

    // Relación OneToOne con Usuario
    @OneToOne('User')
    @JoinColumn({ name: 'idUsuario' })
    usuario?: any;

    // Relación OneToMany con Productos
    @OneToMany('Producto', 'emprendedor')
    productos?: any[];
}