import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../Usuario/User.js";

@Entity('ordenes')
export class Orden {
    @PrimaryGeneratedColumn()
    idOrden!: number;

    @Column({ type: 'integer', nullable: false })
    idUsuario!: number;

    @Column({ type: 'date', nullable: false })
    fechaOrden!: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    estado!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    total!: number;

    // Relación con Usuario
    @ManyToOne(() => User)
    @JoinColumn({ name: 'idUsuario' })
    usuario?: User;

    // Relación con DetalleOrden
    @OneToMany('DetalleOrden', 'orden')
    detallesOrden?: any[];

    // Relación con Pagos
    @OneToMany('Pago', 'orden')
    pagos?: any[];
}