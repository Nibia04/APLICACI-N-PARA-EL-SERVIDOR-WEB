import { DetalleCarroRepository } from './DetalleCarroRepository.js';
import { DetalleCarro } from './DetalleCarro.js';
import { AppDataSource } from '../../data-source.js';
import { CarritoCompraRepository } from '../CarritoCompra/CarritoCompraRepository.js';
import { ProductoRepository } from '../Producto/ProductoRepository.js';
import { Producto } from '../Producto/Producto.js';

export interface CreateDetalleCarroDto {
    idCarrito: number;
    idProducto: number;
    cantidad: number;
}

export interface UpdateDetalleCarroDto {
    cantidad?: number;
}

export interface DetalleCarroStatistics {
    totalDetalles: number;
    totalProductosUnicos: number;
    totalCarritosConItems: number;
    promedioItemsPorCarrito: number;
    promedioSubtotalPorCarrito: number;
    productosMasAgregados: { idProducto: number, totalCantidad: number, totalVeces: number }[];
    carritosConMasItems: { idCarrito: number, totalItems: number, totalSubtotal: number }[];
}

export interface CarritoResumen {
    idCarrito: number;
    totalItems: number;
    totalSubtotal: number;
    detalles: DetalleCarro[];
}

export class DetalleCarroService {
    private detalleCarroRepository: DetalleCarroRepository;
    private carritoRepository: CarritoCompraRepository;
    private productoRepository: ProductoRepository;

    constructor() {
        this.detalleCarroRepository = new DetalleCarroRepository(AppDataSource.getRepository(DetalleCarro));
        this.carritoRepository = new CarritoCompraRepository();
        this.productoRepository = new ProductoRepository(AppDataSource.getRepository(Producto));
    }

    async agregarProductoAlCarrito(data: CreateDetalleCarroDto): Promise<DetalleCarro> {
        // Validaciones básicas
        if (!data.idCarrito || data.idCarrito <= 0) {
            throw new Error('ID de carrito inválido');
        }

        if (!data.idProducto || data.idProducto <= 0) {
            throw new Error('ID de producto inválido');
        }

        if (!data.cantidad || data.cantidad <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }

        // Verificar que el carrito existe
        const carritoExistente = await this.carritoRepository.findById(data.idCarrito);
        if (!carritoExistente) {
            throw new Error('El carrito no existe');
        }

        // Verificar que el producto existe
        const productoExistente = await this.productoRepository.findById(data.idProducto);
        if (!productoExistente) {
            throw new Error('El producto no existe');
        }

        // Verificar stock disponible
        if (productoExistente.stock < data.cantidad) {
            throw new Error(`Stock insuficiente. Stock disponible: ${productoExistente.stock}`);
        }

        // Verificar si ya existe este producto en el carrito
        const detalleExistente = await this.detalleCarroRepository.findByCarritoAndProducto(
            data.idCarrito, 
            data.idProducto
        );

        if (detalleExistente) {
            // Si ya existe, actualizar la cantidad
            const nuevaCantidad = detalleExistente.cantidad + data.cantidad;
            
            // Verificar stock para la nueva cantidad
            if (productoExistente.stock < nuevaCantidad) {
                throw new Error(`Stock insuficiente para la cantidad total. Stock disponible: ${productoExistente.stock}, cantidad actual en carrito: ${detalleExistente.cantidad}`);
            }

            const nuevoSubtotal = nuevaCantidad * productoExistente.precio;
            
            return await this.updateDetalleCarro(detalleExistente.idDetalleCarrito, {
                cantidad: nuevaCantidad
            }) as DetalleCarro;
        } else {
            // Si no existe, crear nuevo detalle
            const subtotal = data.cantidad * productoExistente.precio;

            const detalle = new DetalleCarro(
                data.idCarrito,
                data.idProducto,
                data.cantidad,
                subtotal
            );

            return await this.detalleCarroRepository.create(detalle);
        }
    }

    async getAllDetalles(): Promise<DetalleCarro[]> {
        return await this.detalleCarroRepository.findAll();
    }

    async getDetalleById(id: number): Promise<DetalleCarro | null> {
        if (id <= 0) {
            throw new Error('ID de detalle inválido');
        }
        return await this.detalleCarroRepository.findById(id);
    }

    async getDetallesByCarrito(idCarrito: number): Promise<DetalleCarro[]> {
        if (idCarrito <= 0) {
            throw new Error('ID de carrito inválido');
        }
        return await this.detalleCarroRepository.findByCarrito(idCarrito);
    }

    async getDetallesByProducto(idProducto: number): Promise<DetalleCarro[]> {
        if (idProducto <= 0) {
            throw new Error('ID de producto inválido');
        }
        return await this.detalleCarroRepository.findByProducto(idProducto);
    }

    async updateDetalleCarro(id: number, data: UpdateDetalleCarroDto): Promise<DetalleCarro | null> {
        if (id <= 0) {
            throw new Error('ID de detalle inválido');
        }

        const detalleExistente = await this.detalleCarroRepository.findById(id);
        if (!detalleExistente) {
            throw new Error('Detalle de carrito no encontrado');
        }

        if (data.cantidad !== undefined) {
            if (data.cantidad <= 0) {
                throw new Error('La cantidad debe ser mayor a 0');
            }

            // Verificar stock disponible
            const productoExistente = await this.productoRepository.findById(detalleExistente.idProducto);
            if (!productoExistente) {
                throw new Error('Producto no encontrado');
            }

            if (productoExistente.stock < data.cantidad) {
                throw new Error(`Stock insuficiente. Stock disponible: ${productoExistente.stock}`);
            }

            // Calcular nuevo subtotal
            const nuevoSubtotal = data.cantidad * productoExistente.precio;
            
            return await this.detalleCarroRepository.update(id, {
                cantidad: data.cantidad,
                subtotal: nuevoSubtotal
            });
        }

        return detalleExistente;
    }

    async eliminarDetalleCarrito(id: number): Promise<boolean> {
        if (id <= 0) {
            throw new Error('ID de detalle inválido');
        }

        const detalleExistente = await this.detalleCarroRepository.findById(id);
        if (!detalleExistente) {
            throw new Error('Detalle de carrito no encontrado');
        }

        return await this.detalleCarroRepository.delete(id);
    }

    async eliminarProductoDelCarrito(idCarrito: number, idProducto: number): Promise<boolean> {
        if (idCarrito <= 0) {
            throw new Error('ID de carrito inválido');
        }

        if (idProducto <= 0) {
            throw new Error('ID de producto inválido');
        }

        return await this.detalleCarroRepository.deleteByCarritoAndProducto(idCarrito, idProducto);
    }

    async vaciarCarrito(idCarrito: number): Promise<boolean> {
        if (idCarrito <= 0) {
            throw new Error('ID de carrito inválido');
        }

        // Verificar que el carrito existe
        const carritoExistente = await this.carritoRepository.findById(idCarrito);
        if (!carritoExistente) {
            throw new Error('El carrito no existe');
        }

        return await this.detalleCarroRepository.deleteByCarrito(idCarrito);
    }

    async getResumenCarrito(idCarrito: number): Promise<CarritoResumen> {
        if (idCarrito <= 0) {
            throw new Error('ID de carrito inválido');
        }

        const detalles = await this.detalleCarroRepository.findByCarrito(idCarrito);
        const totalItems = await this.detalleCarroRepository.getTotalItemsByCarrito(idCarrito);
        const totalSubtotal = await this.detalleCarroRepository.getTotalSubtotalByCarrito(idCarrito);

        return {
            idCarrito,
            totalItems,
            totalSubtotal: Math.round(totalSubtotal * 100) / 100,
            detalles
        };
    }

    async actualizarCantidadProducto(idCarrito: number, idProducto: number, nuevaCantidad: number): Promise<DetalleCarro | null> {
        if (idCarrito <= 0) {
            throw new Error('ID de carrito inválido');
        }

        if (idProducto <= 0) {
            throw new Error('ID de producto inválido');
        }

        if (nuevaCantidad <= 0) {
            throw new Error('La cantidad debe ser mayor a 0');
        }

        const detalleExistente = await this.detalleCarroRepository.findByCarritoAndProducto(idCarrito, idProducto);
        if (!detalleExistente) {
            throw new Error('El producto no está en el carrito');
        }

        return await this.updateDetalleCarro(detalleExistente.idDetalleCarrito, {
            cantidad: nuevaCantidad
        });
    }

    async getDetalleCarroStatistics(): Promise<DetalleCarroStatistics> {
        const estadisticasGenerales = await this.detalleCarroRepository.getEstadisticasGenerales();
        const productosMasAgregados = await this.detalleCarroRepository.getProductosMasAgregados(5);
        const carritosConMasItems = await this.detalleCarroRepository.getCarritosConMasItems(5);

        return {
            totalDetalles: estadisticasGenerales.totalDetalles,
            totalProductosUnicos: estadisticasGenerales.totalProductosUnicos,
            totalCarritosConItems: estadisticasGenerales.totalCarritosConItems,
            promedioItemsPorCarrito: Math.round(estadisticasGenerales.promedioItemsPorCarrito * 100) / 100,
            promedioSubtotalPorCarrito: Math.round(estadisticasGenerales.promedioSubtotalPorCarrito * 100) / 100,
            productosMasAgregados,
            carritosConMasItems
        };
    }

    async duplicarCarrito(idCarritoOrigen: number, idCarritoDestino: number): Promise<DetalleCarro[]> {
        if (idCarritoOrigen <= 0 || idCarritoDestino <= 0) {
            throw new Error('IDs de carrito inválidos');
        }

        if (idCarritoOrigen === idCarritoDestino) {
            throw new Error('El carrito origen y destino no pueden ser el mismo');
        }

        // Verificar que ambos carritos existen
        const carritoOrigen = await this.carritoRepository.findById(idCarritoOrigen);
        const carritoDestino = await this.carritoRepository.findById(idCarritoDestino);

        if (!carritoOrigen) {
            throw new Error('Carrito origen no existe');
        }

        if (!carritoDestino) {
            throw new Error('Carrito destino no existe');
        }

        // Vaciar carrito destino primero
        await this.vaciarCarrito(idCarritoDestino);

        // Obtener detalles del carrito origen
        const detallesOrigen = await this.detalleCarroRepository.findByCarrito(idCarritoOrigen);
        const nuevosDetalles: DetalleCarro[] = [];

        // Copiar cada detalle al carrito destino
        for (const detalle of detallesOrigen) {
            try {
                const nuevoDetalle = await this.agregarProductoAlCarrito({
                    idCarrito: idCarritoDestino,
                    idProducto: detalle.idProducto,
                    cantidad: detalle.cantidad
                });
                nuevosDetalles.push(nuevoDetalle);
            } catch (error) {
                console.warn(`No se pudo copiar producto ${detalle.idProducto}: ${error}`);
            }
        }

        return nuevosDetalles;
    }

    async getProductosMasAgregados(limite: number = 10): Promise<{ idProducto: number, totalCantidad: number, totalVeces: number }[]> {
        return await this.detalleCarroRepository.getProductosMasAgregados(limite);
    }

    async getCarritosConMasItems(limite: number = 10): Promise<{ idCarrito: number, totalItems: number, totalSubtotal: number }[]> {
        return await this.detalleCarroRepository.getCarritosConMasItems(limite);
    }
}