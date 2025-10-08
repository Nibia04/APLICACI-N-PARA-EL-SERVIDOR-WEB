import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../Usuario/User.js';
import { Producto } from '../Producto/Producto.js';

@Entity('historial_compras')
export class HistorialCompra {
    @PrimaryGeneratedColumn()
    idHistorial!: number;

    @Column({ type: 'integer', nullable: false })
    idUsuario!: number;

    @Column({ type: 'integer', nullable: false })
    idProducto!: number;

    @Column({ type: 'integer', nullable: false })
    cantidad!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    precioCompra!: number;

    @Column({ type: 'datetime', nullable: false })
    fechaCompra!: Date;

    @Column({ type: 'varchar', length: 50, nullable: false })
    estado!: string; // 'completado', 'cancelado', 'devuelto'

    @Column({ type: 'integer', nullable: true })
    calificacion?: number; // 1-5 estrellas

    @Column({ type: 'varchar', length: 255, nullable: true })
    comentario?: string;

    // Relaciones
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'idUsuario' })
    usuario!: User;

    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'idProducto' })
    producto!: Producto;

    constructor(
        idUsuario?: number,
        idProducto?: number,
        cantidad?: number,
        precioCompra?: number,
        estado?: string
    ) {
        if (idUsuario !== undefined) this.idUsuario = idUsuario;
        if (idProducto !== undefined) this.idProducto = idProducto;
        if (cantidad !== undefined) this.cantidad = cantidad;
        if (precioCompra !== undefined) this.precioCompra = precioCompra;
        if (estado !== undefined) this.estado = estado;
        this.fechaCompra = new Date();
    }

    // Métodos de negocio
    calificarCompra(calificacion: number, comentario?: string): void {
        if (calificacion < 1 || calificacion > 5) {
            throw new Error('La calificación debe estar entre 1 y 5');
        }
        this.calificacion = calificacion;
        if (comentario) this.comentario = comentario;
    }

    marcarComoCompletado(): void {
        this.estado = 'completado';
    }

    marcarComoCancelado(): void {
        this.estado = 'cancelado';
    }

    marcarComoDevuelto(): void {
        this.estado = 'devuelto';
    }

    obtenerValorTotal(): number {
        return Number((this.cantidad * this.precioCompra).toFixed(2));
    }

    esCompraReciente(): boolean {
        const treintaDiasAtras = new Date();
        treintaDiasAtras.setDate(treintaDiasAtras.getDate() - 30);
        return this.fechaCompra > treintaDiasAtras;
    }

    puedeCalificar(): boolean {
        return this.estado === 'completado' && !this.calificacion;
    }

    puedeDevolver(): boolean {
        const sieteDiasAtras = new Date();
        sieteDiasAtras.setDate(sieteDiasAtras.getDate() - 7);
        return this.estado === 'completado' && this.fechaCompra > sieteDiasAtras;
    }
}