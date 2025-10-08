import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from '../Orden/Orden.js';
import { Producto } from '../Producto/Producto.js';

@Entity('detalle_orden')
export class DetalleOrden {
    @PrimaryGeneratedColumn()
    idDetalleOrden!: number;

    @Column({ type: 'int', nullable: false })
    idOrden!: number;

    @Column({ type: 'int', nullable: false })
    idProducto!: number;

    @Column({ type: 'int', nullable: false })
    cantidad!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    precioUnitario!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    subtotal!: number;

    // Relaciones
    @ManyToOne(() => Orden, orden => orden.detallesOrden, { eager: true })
    @JoinColumn({ name: 'idOrden' })
    orden!: Orden;

    @ManyToOne(() => Producto, producto => producto.detallesOrden, { eager: true })
    @JoinColumn({ name: 'idProducto' })
    producto!: Producto;

    constructor(
        idOrden?: number,
        idProducto?: number,
        cantidad?: number,
        precioUnitario?: number
    ) {
        if (idOrden !== undefined) this.idOrden = idOrden;
        if (idProducto !== undefined) this.idProducto = idProducto;
        if (cantidad !== undefined) this.cantidad = cantidad;
        if (precioUnitario !== undefined) this.precioUnitario = precioUnitario;
        
        // Calcular subtotal automáticamente
        if (cantidad !== undefined && precioUnitario !== undefined) {
            this.subtotal = Number((cantidad * precioUnitario).toFixed(2));
        }
    }

    // Métodos de negocio
    actualizarCantidad(nuevaCantidad: number): void {
        if (nuevaCantidad <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }
        this.cantidad = nuevaCantidad;
        this.subtotal = Number((this.cantidad * this.precioUnitario).toFixed(2));
    }

    actualizarPrecio(nuevoPrecio: number): void {
        if (nuevoPrecio <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }
        this.precioUnitario = nuevoPrecio;
        this.subtotal = Number((this.cantidad * this.precioUnitario).toFixed(2));
    }

    calcularSubtotal(): number {
        return Number((this.cantidad * this.precioUnitario).toFixed(2));
    }

    validarDetalle(): boolean {
        return this.cantidad > 0 && 
               this.precioUnitario > 0 && 
               this.idOrden > 0 && 
               this.idProducto > 0;
    }

    obtenerDescripcionDetalle(): string {
        const nombreProducto = this.producto?.nombreProducto || 'Producto desconocido';
        return `${this.cantidad}x ${nombreProducto} - $${this.precioUnitario} c/u = $${this.subtotal}`;
    }

    esIgualA(otroDetalle: DetalleOrden): boolean {
        return this.idOrden === otroDetalle.idOrden && 
               this.idProducto === otroDetalle.idProducto;
    }

    obtenerMargenGanancia(costoProducto: number): number {
        if (costoProducto <= 0) return 0;
        const ganancia = this.precioUnitario - costoProducto;
        return Number(((ganancia / costoProducto) * 100).toFixed(2));
    }
}