import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./Domains/Usuario/User.js";
import { Categoria } from "./Domains/Categoria/Categoria.js";
import { Emprendedor } from "./Domains/Emprendedor/Emprendedor.js";
import { Orden } from "./Domains/Orden/Orden.js";
import { TarjetaVirtual } from "./Domains/Tarjeta Virtual/TarjetaVirtual.js";
import { CarritoCompra } from "./Domains/CarritoCompra/CarritoCompra.js";
import { Producto } from "./Domains/Producto/Producto.js";
import { Pago } from "./Domains/Pago/Pago.js";
import { DetalleCarro } from "./Domains/DetalleCarro/DetalleCarro.js";
import { DetalleOrden } from "./Domains/DetalleOrden/DetalleOrden.js";
import { HistorialCompra } from "./Domains/HistorialCompra/HistorialCompra.js";
import { Favorito } from "./Domains/Favorito/Favorito.js";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Categoria, Emprendedor, Orden, TarjetaVirtual, CarritoCompra, Producto, Pago, DetalleCarro, DetalleOrden, HistorialCompra, Favorito],
    migrations: [],
    subscribers: [],
});