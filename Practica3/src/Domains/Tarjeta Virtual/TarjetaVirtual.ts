import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../Usuario/User.js";

@Entity('tarjetas_virtuales')
export class TarjetaVirtual {
    @PrimaryGeneratedColumn()
    idTarjeta!: number;

    @Column({ type: 'integer', nullable: false })
    idUsuario!: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    numeroTarjeta!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    saldoDisponible!: number;

    @Column({ type: 'date', nullable: false })
    fechaExpiracion!: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    estado!: string;

    // Relación con Usuario
    @ManyToOne(() => User)
    @JoinColumn({ name: 'idUsuario' })
    usuario?: User;

    // Relación con Pagos (una tarjeta puede usarse en múltiples pagos)
    @OneToMany('Pago', 'tarjetaVirtual')
    pagos?: any[];
}