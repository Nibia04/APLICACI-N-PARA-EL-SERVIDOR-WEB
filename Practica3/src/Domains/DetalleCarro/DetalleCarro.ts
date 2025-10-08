import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CarritoCompra } from '../CarritoCompra/CarritoCompra.js';
import { Producto } from '../Producto/Producto.js';

@Entity('detalle_carritos')
export class DetalleCarro {
    @PrimaryGeneratedColumn()
    idDetalleCarrito!: number;

    @Column({ name: 'idCarrito', type: 'integer' })
    idCarrito!: number;

    @Column({ name: 'idProducto', type: 'integer' })
    idProducto!: number;

    @Column({ type: 'integer', nullable: false })
    cantidad!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    subtotal!: number;

    // Relación Many-to-One con CarritoCompra
    @ManyToOne(() => CarritoCompra, { eager: true })
    @JoinColumn({ name: 'idCarrito' })
    carrito!: CarritoCompra;

    // Relación Many-to-One con Producto
    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'idProducto' })
    producto!: Producto;

    constructor(
        idCarrito?: number,
        idProducto?: number,
        cantidad?: number,
        subtotal?: number
    ) {
        if (idCarrito !== undefined) this.idCarrito = idCarrito;
        if (idProducto !== undefined) this.idProducto = idProducto;
        if (cantidad !== undefined) this.cantidad = cantidad;
        if (subtotal !== undefined) this.subtotal = subtotal;
    }
}