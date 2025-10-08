import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../Usuario/User.js';
import { Producto } from '../Producto/Producto.js';

@Entity('favoritos')
export class Favorito {
    @PrimaryGeneratedColumn()
    idFavorito!: number;

    @Column({ type: 'integer', nullable: false })
    idUsuario!: number;

    @Column({ type: 'integer', nullable: false })
    idProducto!: number;

    @Column({ type: 'datetime', nullable: false })
    fechaAgregado!: Date;

    @Column({ type: 'boolean', nullable: false, default: true })
    activo!: boolean;

    // Relaciones
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'idUsuario' })
    usuario!: User;

    @ManyToOne(() => Producto, { eager: true })
    @JoinColumn({ name: 'idProducto' })
    producto!: Producto;

    constructor(idUsuario?: number, idProducto?: number) {
        if (idUsuario !== undefined) this.idUsuario = idUsuario;
        if (idProducto !== undefined) this.idProducto = idProducto;
        this.fechaAgregado = new Date();
        this.activo = true;
    }

    // Métodos de negocio
    desactivar(): void {
        this.activo = false;
    }

    activar(): void {
        this.activo = true;
    }

    esFavoritoReciente(): boolean {
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
        return this.fechaAgregado > seteDiasAtras;
    }

    obtenerDiasComofavorito(): number {
        const ahora = new Date();
        const diferenciaTiempo = ahora.getTime() - this.fechaAgregado.getTime();
        return Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
    }
}