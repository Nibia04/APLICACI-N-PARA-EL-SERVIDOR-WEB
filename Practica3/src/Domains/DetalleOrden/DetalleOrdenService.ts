import { DetalleOrden } from './DetalleOrden.js';
import { DetalleOrdenRepository } from './DetalleOrdenRepository.js';

export class DetalleOrdenService {
    private detalleOrdenRepository: DetalleOrdenRepository;

    constructor() {
        this.detalleOrdenRepository = new DetalleOrdenRepository();
    }

    async crearDetalleOrden(
        idOrden: number,
        idProducto: number,
        cantidad: number,
        precioUnitario: number
    ): Promise<DetalleOrden> {
        try {
            if (cantidad <= 0) {
                throw new Error('La cantidad debe ser mayor a 0');
            }
            if (precioUnitario <= 0) {
                throw new Error('El precio unitario debe ser mayor a 0');
            }

            const nuevoDetalle = new DetalleOrden(idOrden, idProducto, cantidad, precioUnitario);
            
            if (!nuevoDetalle.validarDetalle()) {
                throw new Error('Los datos del detalle de orden no son válidos');
            }

            return await this.detalleOrdenRepository.crear(nuevoDetalle);
        } catch (error) {
            throw new Error(`Error en el servicio al crear detalle de orden: ${error}`);
        }
    }

    async obtenerTodosLosDetalles(): Promise<DetalleOrden[]> {
        try {
            return await this.detalleOrdenRepository.obtenerTodos();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener detalles: ${error}`);
        }
    }

    async obtenerDetallePorId(id: number): Promise<DetalleOrden | null> {
        try {
            if (id <= 0) {
                throw new Error('El ID debe ser mayor a 0');
            }
            return await this.detalleOrdenRepository.obtenerPorId(id);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener detalle por ID: ${error}`);
        }
    }

    async obtenerDetallesPorOrden(idOrden: number): Promise<DetalleOrden[]> {
        try {
            if (idOrden <= 0) {
                throw new Error('El ID de orden debe ser mayor a 0');
            }
            return await this.detalleOrdenRepository.obtenerPorOrden(idOrden);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener detalles por orden: ${error}`);
        }
    }

    async obtenerDetallesPorProducto(idProducto: number): Promise<DetalleOrden[]> {
        try {
            if (idProducto <= 0) {
                throw new Error('El ID de producto debe ser mayor a 0');
            }
            return await this.detalleOrdenRepository.obtenerPorProducto(idProducto);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener detalles por producto: ${error}`);
        }
    }

    async actualizarCantidad(id: number, nuevaCantidad: number): Promise<DetalleOrden | null> {
        try {
            if (nuevaCantidad <= 0) {
                throw new Error('La nueva cantidad debe ser mayor a 0');
            }

            const detalle = await this.detalleOrdenRepository.obtenerPorId(id);
            if (!detalle) {
                throw new Error('Detalle de orden no encontrado');
            }

            return await this.detalleOrdenRepository.actualizar(id, { 
                cantidad: nuevaCantidad,
                subtotal: Number((nuevaCantidad * detalle.precioUnitario).toFixed(2))
            });
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar cantidad: ${error}`);
        }
    }

    async actualizarPrecio(id: number, nuevoPrecio: number): Promise<DetalleOrden | null> {
        try {
            if (nuevoPrecio <= 0) {
                throw new Error('El nuevo precio debe ser mayor a 0');
            }

            const detalle = await this.detalleOrdenRepository.obtenerPorId(id);
            if (!detalle) {
                throw new Error('Detalle de orden no encontrado');
            }

            return await this.detalleOrdenRepository.actualizar(id, { 
                precioUnitario: nuevoPrecio,
                subtotal: Number((detalle.cantidad * nuevoPrecio).toFixed(2))
            });
        } catch (error) {
            throw new Error(`Error en el servicio al actualizar precio: ${error}`);
        }
    }

    async eliminarDetalle(id: number): Promise<boolean> {
        try {
            if (id <= 0) {
                throw new Error('El ID debe ser mayor a 0');
            }

            const detalle = await this.detalleOrdenRepository.obtenerPorId(id);
            if (!detalle) {
                throw new Error('Detalle de orden no encontrado');
            }

            return await this.detalleOrdenRepository.eliminar(id);
        } catch (error) {
            throw new Error(`Error en el servicio al eliminar detalle: ${error}`);
        }
    }

    async limpiarOrden(idOrden: number): Promise<boolean> {
        try {
            if (idOrden <= 0) {
                throw new Error('El ID de orden debe ser mayor a 0');
            }
            return await this.detalleOrdenRepository.eliminarPorOrden(idOrden);
        } catch (error) {
            throw new Error(`Error en el servicio al limpiar orden: ${error}`);
        }
    }

    async obtenerResumenOrden(idOrden: number): Promise<{
        idOrden: number;
        totalItems: number;
        totalSubtotal: number;
        detalles: DetalleOrden[];
    }> {
        try {
            if (idOrden <= 0) {
                throw new Error('El ID de orden debe ser mayor a 0');
            }
            return await this.detalleOrdenRepository.obtenerResumenOrden(idOrden);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener resumen de orden: ${error}`);
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
            if (limite <= 0) {
                throw new Error('El límite debe ser mayor a 0');
            }
            return await this.detalleOrdenRepository.obtenerProductosMasVendidos(limite);
        } catch (error) {
            throw new Error(`Error en el servicio al obtener productos más vendidos: ${error}`);
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
            return await this.detalleOrdenRepository.obtenerEstadisticas();
        } catch (error) {
            throw new Error(`Error en el servicio al obtener estadísticas: ${error}`);
        }
    }

    async duplicarOrden(idOrdenOrigen: number, idOrdenDestino: number): Promise<DetalleOrden[]> {
        try {
            if (idOrdenOrigen <= 0 || idOrdenDestino <= 0) {
                throw new Error('Los IDs de orden deben ser mayores a 0');
            }
            if (idOrdenOrigen === idOrdenDestino) {
                throw new Error('Las órdenes origen y destino no pueden ser la misma');
            }
            return await this.detalleOrdenRepository.duplicarDetallesOrden(idOrdenOrigen, idOrdenDestino);
        } catch (error) {
            throw new Error(`Error en el servicio al duplicar orden: ${error}`);
        }
    }

    async calcularDescuentoPorVolumen(idOrden: number, porcentajeDescuento: number): Promise<{
        ordenOriginal: any;
        totalOriginal: number;
        descuentoAplicado: number;
        totalConDescuento: number;
    }> {
        try {
            if (porcentajeDescuento < 0 || porcentajeDescuento > 100) {
                throw new Error('El porcentaje de descuento debe estar entre 0 y 100');
            }

            const resumen = await this.obtenerResumenOrden(idOrden);
            const descuentoAplicado = Number((resumen.totalSubtotal * (porcentajeDescuento / 100)).toFixed(2));
            const totalConDescuento = Number((resumen.totalSubtotal - descuentoAplicado).toFixed(2));

            return {
                ordenOriginal: resumen,
                totalOriginal: resumen.totalSubtotal,
                descuentoAplicado,
                totalConDescuento
            };
        } catch (error) {
            throw new Error(`Error en el servicio al calcular descuento: ${error}`);
        }
    }

    async validarInventarioOrden(idOrden: number): Promise<{
        esValida: boolean;
        productosInsuficientes: Array<{
            idProducto: number;
            nombreProducto: string;
            cantidadSolicitada: number;
            stockDisponible: number;
        }>;
    }> {
        try {
            const detalles = await this.obtenerDetallesPorOrden(idOrden);
            const productosInsuficientes: Array<{
                idProducto: number;
                nombreProducto: string;
                cantidadSolicitada: number;
                stockDisponible: number;
            }> = [];

            for (const detalle of detalles) {
                if (detalle.producto && detalle.cantidad > detalle.producto.stock) {
                    productosInsuficientes.push({
                        idProducto: detalle.idProducto,
                        nombreProducto: detalle.producto.nombreProducto,
                        cantidadSolicitada: detalle.cantidad,
                        stockDisponible: detalle.producto.stock
                    });
                }
            }

            return {
                esValida: productosInsuficientes.length === 0,
                productosInsuficientes
            };
        } catch (error) {
            throw new Error(`Error en el servicio al validar inventario: ${error}`);
        }
    }

    async generarFacturacion(idOrden: number): Promise<{
        numeroFactura: string;
        fechaEmision: string;
        resumenOrden: any;
        impuestos: number;
        totalFinal: number;
        detallesFactura: Array<{
            descripcion: string;
            cantidad: number;
            precioUnitario: number;
            subtotal: number;
        }>;
    }> {
        try {
            const resumen = await this.obtenerResumenOrden(idOrden);
            const numeroFactura = `FACT-${idOrden}-${Date.now()}`;
            const fechaEmision = new Date().toISOString().split('T')[0] || '';
            const impuestos = Number((resumen.totalSubtotal * 0.12).toFixed(2)); // 12% IVA
            const totalFinal = Number((resumen.totalSubtotal + impuestos).toFixed(2));

            const detallesFactura = resumen.detalles.map(detalle => ({
                descripcion: detalle.producto?.nombreProducto || 'Producto desconocido',
                cantidad: detalle.cantidad,
                precioUnitario: detalle.precioUnitario,
                subtotal: detalle.subtotal
            }));

            return {
                numeroFactura,
                fechaEmision: fechaEmision,
                resumenOrden: resumen,
                impuestos,
                totalFinal,
                detallesFactura
            };
        } catch (error) {
            throw new Error(`Error en el servicio al generar facturación: ${error}`);
        }
    }
}