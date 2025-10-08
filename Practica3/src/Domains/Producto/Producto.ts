import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Emprendedor } from '../Emprendedor/Emprendedor.js';

@Entity('productos')
export class Producto {
    @PrimaryGeneratedColumn()
    idProducto!: number;

    @Column({ name: 'idVendedor', type: 'integer' })
    idVendedor!: number;

    @Column({ length: 100, nullable: false, type: 'varchar' })
    nombreProducto!: string;

    @Column({ length: 255, nullable: false, type: 'varchar' })
    descripcion!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    precio!: number;

    @Column({ type: 'integer', nullable: false })
    stock!: number;

    @Column({ length: 50, nullable: false, type: 'varchar' })
    categoria!: string;

    @Column({ length: 200, nullable: true, type: 'varchar' })
    imagenURL?: string;

    // Relación Many-to-One con Emprendedor
    @ManyToOne(() => Emprendedor, { eager: true })
    @JoinColumn({ name: 'idVendedor' })
    emprendedor!: Emprendedor;

    // Relación con DetalleOrden
    @OneToMany('DetalleOrden', 'producto')
    detallesOrden?: any[];

    // Relación con DetalleCarro
    @OneToMany('DetalleCarro', 'producto')
    detallesCarro?: any[];

    // Relación Many-to-Many con Categorias
    @ManyToMany('Categoria', 'productos')
    categorias?: any[];

    // Relación con HistorialCompra
    @OneToMany('HistorialCompra', 'producto')
    historialCompras?: any[];

    // Relación con Favoritos
    @OneToMany('Favorito', 'producto')
    favoritos?: any[];

    constructor(
        idVendedor?: number,
        nombreProducto?: string,
        descripcion?: string,
        precio?: number,
        stock?: number,
        categoria?: string,
        imagenURL?: string
    ) {
        if (idVendedor !== undefined) this.idVendedor = idVendedor;
        if (nombreProducto !== undefined) this.nombreProducto = nombreProducto;
        if (descripcion !== undefined) this.descripcion = descripcion;
        if (precio !== undefined) this.precio = precio;
        if (stock !== undefined) this.stock = stock;
        if (categoria !== undefined) this.categoria = categoria;
        if (imagenURL !== undefined) this.imagenURL = imagenURL;
    }
}