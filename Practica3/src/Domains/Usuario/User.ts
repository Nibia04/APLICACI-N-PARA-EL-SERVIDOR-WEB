import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";

@Entity('usuarios')
export class User {
    @PrimaryGeneratedColumn()
    idUsuario!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    apellido!: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    contraseña!: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    direccion?: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    telefono?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    rol?: string;

    @Column({ type: 'date', nullable: false })
    fechaRegistro!: Date;

    // Relación OneToOne con Emprendedor
    @OneToOne('Emprendedor', 'usuario')
    emprendedor?: any;

    // Relaciones OneToMany
    @OneToMany('Orden', 'usuario')
    ordenes?: any[];

    @OneToMany('CarritoCompra', 'usuario')
    carritos?: any[];

    @OneToMany('TarjetaVirtual', 'usuario')
    tarjetasVirtuales?: any[];

    @OneToMany('HistorialCompra', 'usuario')
    historialCompras?: any[];

    @OneToMany('Favorito', 'usuario')
    favoritos?: any[];
}

