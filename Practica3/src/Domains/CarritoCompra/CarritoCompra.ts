import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../Usuario/User.js";

@Entity('carritos_compra')
export class CarritoCompra {
    @PrimaryGeneratedColumn()
    idCarrito!: number;

    @Column({ type: 'integer', nullable: false })
    idUsuario!: number;

    @Column({ type: 'date', nullable: false })
    fechaCreacion!: Date;

    // Relación con Usuario
    @ManyToOne(() => User)
    @JoinColumn({ name: 'idUsuario' })
    usuario?: User;

    // Relación con DetallesCarro
    @OneToMany('DetalleCarro', 'carrito')
    detallesCarrito?: any[];
}