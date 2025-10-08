import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from '../Orden/Orden.js';

@Entity('pagos')
export class Pago {
    @PrimaryGeneratedColumn()
    idPago!: number;

    @Column({ name: 'idOrden', type: 'integer' })
    idOrden!: number;

    @Column({ name: 'idTarjeta', type: 'integer', nullable: true })
    idTarjeta?: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    monto!: number;

    @Column({ length: 50, nullable: false, type: 'varchar' })
    metodoPago!: string;

    @Column({ length: 50, nullable: false, type: 'varchar' })
    estadoPago!: string;

    @Column({ type: 'date', nullable: false })
    fechaPago!: Date;

    @Column({ length: 100, nullable: false, type: 'varchar' })
    hashTransaccion!: string;

    // Relación Many-to-One con Orden
    @ManyToOne(() => Orden, { eager: true })
    @JoinColumn({ name: 'idOrden' })
    orden!: Orden;

    // Relación opcional con TarjetaVirtual
    @ManyToOne('TarjetaVirtual', { nullable: true })
    @JoinColumn({ name: 'idTarjeta' })
    tarjetaVirtual?: any;

    constructor(
        idOrden?: number,
        monto?: number,
        metodoPago?: string,
        estadoPago?: string,
        fechaPago?: Date,
        hashTransaccion?: string
    ) {
        if (idOrden !== undefined) this.idOrden = idOrden;
        if (monto !== undefined) this.monto = monto;
        if (metodoPago !== undefined) this.metodoPago = metodoPago;
        if (estadoPago !== undefined) this.estadoPago = estadoPago;
        if (fechaPago !== undefined) this.fechaPago = fechaPago;
        if (hashTransaccion !== undefined) this.hashTransaccion = hashTransaccion;
    }
}