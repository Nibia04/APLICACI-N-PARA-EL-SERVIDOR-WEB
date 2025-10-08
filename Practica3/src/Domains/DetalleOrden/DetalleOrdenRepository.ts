import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source.js';
import { DetalleOrden } from './DetalleOrden.js';

export class DetalleOrdenRepository {
    private repository: Repository<DetalleOrden>;

    constructor() {
        this.repository = AppDataSource.getRepository(DetalleOrden);
    }

    async crear(detalleOrden: DetalleOrden): Promise<DetalleOrden> {
        try {
            // Validar que no exista ya el mismo producto en la misma orden
            const detalleExistente = await this.repository.findOne({
                where: {
                    idOrden: detalleOrden.idOrden,
                    idProducto: detalleOrden.idProducto
                }
            });

            if (detalleExistente) {
                // Si existe, actualizar cantidad
                detalleExistente.cantidad += detalleOrden.cantidad;
                detalleExistente.subtotal = Number((detalleExistente.cantidad * detalleExistente.precioUnitario).toFixed(2));
                return await this.repository.save(detalleExistente);
            }

            return await this.repository.save(detalleOrden);
        } catch (error) {
            throw new Error(`Error al crear detalle de orden: ${error}`);
        }
    }

    async obtenerTodos(): Promise<DetalleOrden[]> {
        try {
            return await this.repository.find({
                relations: ['orden', 'producto']
            });
        } catch (error) {
            throw new Error(`Error al obtener todos los detalles de orden: ${error}`);
        }
    }

    async obtenerPorId(id: number): Promise<DetalleOrden | null> {
        try {
            return await this.repository.findOne({
                where: { idDetalleOrden: id },
                relations: ['orden', 'producto']
            });
        } catch (error) {
            throw new Error(`Error al obtener detalle de orden por ID: ${error}`);
        }
    }

    async obtenerPorOrden(idOrden: number): Promise<DetalleOrden[]> {
        try {
            return await this.repository.find({
                where: { idOrden },
                relations: ['orden', 'producto'],
                order: { idDetalleOrden: 'ASC' }
            });
        } catch (error) {
            throw new Error(`Error al obtener detalles por orden: ${error}`);
        }
    }

    async obtenerPorProducto(idProducto: number): Promise<DetalleOrden[]> {
        try {
            return await this.repository.find({
                where: { idProducto },
                relations: ['orden', 'producto'],
                order: { idDetalleOrden: 'DESC' }
            });
        } catch (error) {
            throw new Error(`Error al obtener detalles por producto: ${error}`);
        }
    }

    async actualizar(id: number, datosActualizados: Partial<DetalleOrden>): Promise<DetalleOrden | null> {
        try {
            const detalle = await this.obtenerPorId(id);
            if (!detalle) return null;

            // Si se actualiza cantidad o precio, recalcular subtotal
            if (datosActualizados.cantidad !== undefined || datosActualizados.precioUnitario !== undefined) {
                const nuevaCantidad = datosActualizados.cantidad ?? detalle.cantidad;
                const nuevoPrecio = datosActualizados.precioUnitario ?? detalle.precioUnitario;
                datosActualizados.subtotal = Number((nuevaCantidad * nuevoPrecio).toFixed(2));
            }

            Object.assign(detalle, datosActualizados);
            return await this.repository.save(detalle);
        } catch (error) {
            throw new Error(`Error al actualizar detalle de orden: ${error}`);
        }
    }

    async eliminar(id: number): Promise<boolean> {
        try {
            const resultado = await this.repository.delete(id);
            return (resultado.affected ?? 0) > 0;
        } catch (error) {
            throw new Error(`Error al eliminar detalle de orden: ${error}`);
        }
    }

    async eliminarPorOrden(idOrden: number): Promise<boolean> {
        try {
            const resultado = await this.repository.delete({ idOrden });
            return (resultado.affected ?? 0) > 0;
        } catch (error) {
            throw new Error(`Error al eliminar detalles de orden: ${error}`);
        }
    }

    async obtenerResumenOrden(idOrden: number): Promise<{
        idOrden: number;
        totalItems: number;
        totalSubtotal: number;
        detalles: DetalleOrden[];
    }> {
        try {
            const detalles = await this.obtenerPorOrden(idOrden);
            const totalItems = detalles.reduce((sum, detalle) => sum + detalle.cantidad, 0);
            const totalSubtotal = detalles.reduce((sum, detalle) => sum + detalle.subtotal, 0);

            return {
                idOrden,
                totalItems,
                totalSubtotal: Number(totalSubtotal.toFixed(2)),
                detalles
            };
        } catch (error) {
            throw new Error(`Error al obtener resumen de orden: ${error}`);
        }
    }

    async obtenerProductosMasVendidos(limite = 5): Promise<Array<{
        idProducto: number;
        nombreProducto: string;
        totalVendido: number;
        totalIngresos: number;
        cantidadOrdenes: number;
    }>> {
        try {
            const query = `
                SELECT 
                    d.idProducto,
                    p.nombreProducto,
                    SUM(d.cantidad) as totalVendido,
                    SUM(d.subtotal) as totalIngresos,
                    COUNT(DISTINCT d.idOrden) as cantidadOrdenes
                FROM detalle_orden d
                INNER JOIN productos p ON d.idProducto = p.idProducto
                GROUP BY d.idProducto, p.nombreProducto
                ORDER BY totalVendido DESC
                LIMIT ?
            `;
            
            return await this.repository.query(query, [limite]);
        } catch (error) {
            throw new Error(`Error al obtener productos más vendidos: ${error}`);
        }
    }

    async obtenerEstadisticas(): Promise<{
        totalDetalles: number;
        totalProductosUnicos: number;
        totalOrdenesConItems: number;
        promedioItemsPorOrden: number;
        promedioSubtotalPorOrden: number;
        productoMasVendido: any;
        ordenConMasItems: any;
    }> {
        try {
            const detalles = await this.obtenerTodos();
            const totalDetalles = detalles.length;
            
            const productosUnicos = new Set(detalles.map(d => d.idProducto)).size;
            const ordenesUnicas = new Set(detalles.map(d => d.idOrden)).size;
            
            const itemsPorOrden = detalles.reduce((acc, detalle) => {
                acc[detalle.idOrden] = (acc[detalle.idOrden] || 0) + detalle.cantidad;
                return acc;
            }, {} as Record<number, number>);

            const subtotalPorOrden = detalles.reduce((acc, detalle) => {
                acc[detalle.idOrden] = (acc[detalle.idOrden] || 0) + detalle.subtotal;
                return acc;
            }, {} as Record<number, number>);

            const promedioItems = ordenesUnicas > 0 ? 
                Object.values(itemsPorOrden).reduce((a, b) => a + b, 0) / ordenesUnicas : 0;
            
            const promedioSubtotal = ordenesUnicas > 0 ? 
                Object.values(subtotalPorOrden).reduce((a, b) => a + b, 0) / ordenesUnicas : 0;

            // Producto más vendido
            const ventasPorProducto = detalles.reduce((acc, detalle) => {
                acc[detalle.idProducto] = (acc[detalle.idProducto] || 0) + detalle.cantidad;
                return acc;
            }, {} as Record<number, number>);

            const productoMasVendido = Object.entries(ventasPorProducto)
                .reduce((max, [id, cantidad]) => 
                    cantidad > max.cantidad ? { idProducto: Number(id), cantidad } : max,
                    { idProducto: 0, cantidad: 0 }
                );

            // Orden con más items
            const ordenConMasItems = Object.entries(itemsPorOrden)
                .reduce((max, [id, items]) => 
                    items > max.items ? { idOrden: Number(id), items } : max,
                    { idOrden: 0, items: 0 }
                );

            return {
                totalDetalles,
                totalProductosUnicos: productosUnicos,
                totalOrdenesConItems: ordenesUnicas,
                promedioItemsPorOrden: Number(promedioItems.toFixed(2)),
                promedioSubtotalPorOrden: Number(promedioSubtotal.toFixed(2)),
                productoMasVendido,
                ordenConMasItems
            };
        } catch (error) {
            throw new Error(`Error al obtener estadísticas: ${error}`);
        }
    }

    async duplicarDetallesOrden(idOrdenOrigen: number, idOrdenDestino: number): Promise<DetalleOrden[]> {
        try {
            const detallesOrigen = await this.obtenerPorOrden(idOrdenOrigen);
            const nuevosDetalles: DetalleOrden[] = [];

            for (const detalle of detallesOrigen) {
                const nuevoDetalle = new DetalleOrden(
                    idOrdenDestino,
                    detalle.idProducto,
                    detalle.cantidad,
                    detalle.precioUnitario
                );
                const detalleCreado = await this.crear(nuevoDetalle);
                nuevosDetalles.push(detalleCreado);
            }

            return nuevosDetalles;
        } catch (error) {
            throw new Error(`Error al duplicar detalles de orden: ${error}`);
        }
    }
}