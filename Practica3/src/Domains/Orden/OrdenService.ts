import { OrdenRepository } from "./OrdenRepository.js";
import { Orden } from "./Orden.js";
import { UserRepository } from "../Usuario/UserRepository.js";

export class OrdenService {
    private ordenRepository: OrdenRepository;
    private userRepository: UserRepository;

    constructor() {
        this.ordenRepository = new OrdenRepository();
        this.userRepository = new UserRepository();
    }

    // Estados válidos para las ordenes
    private readonly ESTADOS_VALIDOS = [
        'pendiente',
        'procesando', 
        'enviada',
        'entregada',
        'cancelada'
    ];

    // Crear una nueva orden con validaciones
    async createOrden(ordenData: {
        idUsuario: number;
        estado?: string;
        total: number;
    }): Promise<Orden> {
        // Validar que el usuario existe
        const usuario = await this.userRepository.findById(ordenData.idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        // Validar total
        if (!ordenData.total || ordenData.total <= 0) {
            throw new Error('El total debe ser mayor a 0');
        }

        // Validar total máximo razonable
        if (ordenData.total > 99999999.99) {
            throw new Error('El total excede el límite máximo permitido');
        }

        // Validar estado si se proporciona
        const estado = ordenData.estado || 'pendiente';
        if (!this.ESTADOS_VALIDOS.includes(estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        // Crear la orden
        const ordenToCreate = {
            ...ordenData,
            estado,
            fechaOrden: new Date()
        };

        return await this.ordenRepository.create(ordenToCreate);
    }

    // Obtener todas las ordenes
    async getAllOrdenes(): Promise<Orden[]> {
        return await this.ordenRepository.findAll();
    }

    // Obtener todas las ordenes ordenadas por fecha
    async getAllOrdenesOrderedByDate(): Promise<Orden[]> {
        return await this.ordenRepository.findAllOrderedByDate();
    }

    // Obtener todas las ordenes ordenadas por total
    async getAllOrdenesOrderedByTotal(): Promise<Orden[]> {
        return await this.ordenRepository.findAllOrderedByTotal();
    }

    // Obtener orden por ID
    async getOrdenById(idOrden: number): Promise<Orden> {
        const orden = await this.ordenRepository.findById(idOrden);
        if (!orden) {
            throw new Error('Orden no encontrada');
        }
        return orden;
    }

    // Obtener ordenes por usuario
    async getOrdenesByUsuario(idUsuario: number): Promise<Orden[]> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        return await this.ordenRepository.findByUsuario(idUsuario);
    }

    // Obtener ordenes por estado
    async getOrdenesByEstado(estado: string): Promise<Orden[]> {
        if (!this.ESTADOS_VALIDOS.includes(estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        return await this.ordenRepository.findByEstado(estado);
    }

    // Obtener ordenes por rango de fechas
    async getOrdenesByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Orden[]> {
        if (fechaInicio > fechaFin) {
            throw new Error('La fecha de inicio no puede ser mayor a la fecha de fin');
        }

        return await this.ordenRepository.findByDateRange(fechaInicio, fechaFin);
    }

    // Obtener ordenes por rango de total
    async getOrdenesByTotalRange(minTotal: number, maxTotal: number): Promise<Orden[]> {
        if (minTotal < 0 || maxTotal < 0) {
            throw new Error('Los totales no pueden ser negativos');
        }

        if (minTotal > maxTotal) {
            throw new Error('El total mínimo no puede ser mayor al total máximo');
        }

        return await this.ordenRepository.findByTotalRange(minTotal, maxTotal);
    }

    // Obtener ordenes recientes
    async getOrdenesRecientes(dias: number = 7): Promise<Orden[]> {
        if (dias <= 0) {
            throw new Error('El número de días debe ser mayor a 0');
        }

        return await this.ordenRepository.getOrdenesRecientes(dias);
    }

    // Actualizar orden
    async updateOrden(idOrden: number, ordenData: Partial<Orden>): Promise<Orden> {
        // Verificar que la orden existe
        const existingOrden = await this.ordenRepository.findById(idOrden);
        if (!existingOrden) {
            throw new Error('Orden no encontrada');
        }

        // Validar estado si se va a actualizar
        if (ordenData.estado && !this.ESTADOS_VALIDOS.includes(ordenData.estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        // Validar total si se va a actualizar
        if (ordenData.total !== undefined) {
            if (ordenData.total <= 0) {
                throw new Error('El total debe ser mayor a 0');
            }
            if (ordenData.total > 99999999.99) {
                throw new Error('El total excede el límite máximo permitido');
            }
        }

        // Validar usuario si se va a actualizar
        if (ordenData.idUsuario) {
            const usuario = await this.userRepository.findById(ordenData.idUsuario);
            if (!usuario) {
                throw new Error('El usuario especificado no existe');
            }
        }

        const updatedOrden = await this.ordenRepository.update(idOrden, ordenData);
        if (!updatedOrden) {
            throw new Error('Error al actualizar la orden');
        }
        return updatedOrden;
    }

    // Cambiar estado de orden
    async cambiarEstadoOrden(idOrden: number, nuevoEstado: string): Promise<Orden> {
        if (!this.ESTADOS_VALIDOS.includes(nuevoEstado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        return await this.updateOrden(idOrden, { estado: nuevoEstado });
    }

    // Cancelar orden
    async cancelarOrden(idOrden: number): Promise<Orden> {
        const orden = await this.getOrdenById(idOrden);
        
        // Verificar que la orden se puede cancelar
        if (orden.estado === 'entregada') {
            throw new Error('No se puede cancelar una orden que ya fue entregada');
        }

        if (orden.estado === 'cancelada') {
            throw new Error('La orden ya está cancelada');
        }

        return await this.cambiarEstadoOrden(idOrden, 'cancelada');
    }

    // Eliminar orden
    async deleteOrden(idOrden: number): Promise<void> {
        // Verificar que la orden existe
        const existingOrden = await this.ordenRepository.findById(idOrden);
        if (!existingOrden) {
            throw new Error('Orden no encontrada');
        }

        const deleted = await this.ordenRepository.delete(idOrden);
        if (!deleted) {
            throw new Error('Error al eliminar la orden');
        }
    }

    // Obtener estadísticas de ordenes
    async getOrdenStats(): Promise<{
        total: number;
        porEstado: Record<string, number>;
        totalVentas: number;
        promedioTotal: number;
        ordenesRecientes: number;
    }> {
        const total = await this.ordenRepository.count();
        const totalVentas = await this.ordenRepository.getTotalVentas();
        const promedioTotal = await this.ordenRepository.getPromedioTotal();
        const ordenesRecientes = (await this.ordenRepository.getOrdenesRecientes(7)).length;

        const porEstado: Record<string, number> = {};
        for (const estado of this.ESTADOS_VALIDOS) {
            porEstado[estado] = await this.ordenRepository.countByEstado(estado);
        }

        return {
            total,
            porEstado,
            totalVentas: Math.round(totalVentas * 100) / 100, // 2 decimales
            promedioTotal: Math.round(promedioTotal * 100) / 100, // 2 decimales
            ordenesRecientes
        };
    }

    // Obtener estadísticas de ordenes por usuario
    async getOrdenStatsByUsuario(idUsuario: number): Promise<{
        totalOrdenes: number;
        totalGastado: number;
        promedioGasto: number;
        ordenesRecientes: number;
    }> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        const totalOrdenes = await this.ordenRepository.countByUsuario(idUsuario);
        const totalGastado = await this.ordenRepository.getTotalVentasByUsuario(idUsuario);
        const promedioGasto = totalOrdenes > 0 ? totalGastado / totalOrdenes : 0;
        
        const ordenesRecientesData = await this.ordenRepository.getOrdenesRecientes(7);
        const ordenesRecientes = ordenesRecientesData.filter(orden => orden.idUsuario === idUsuario).length;

        return {
            totalOrdenes,
            totalGastado: Math.round(totalGastado * 100) / 100,
            promedioGasto: Math.round(promedioGasto * 100) / 100,
            ordenesRecientes
        };
    }

    // Obtener estados válidos
    getEstadosValidos(): string[] {
        return [...this.ESTADOS_VALIDOS];
    }
}