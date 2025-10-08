import { PagoRepository } from './PagoRepository.js';
import { Pago } from './Pago.js';
import { AppDataSource } from '../../data-source.js';
import { OrdenRepository } from '../Orden/OrdenRepository.js';
import * as crypto from 'crypto';

export interface CreatePagoDto {
    idOrden: number;
    monto: number;
    metodoPago: string;
    estadoPago?: string;
    fechaPago?: Date;
}

export interface UpdatePagoDto {
    monto?: number;
    metodoPago?: string;
    estadoPago?: string;
}

export interface PagoStatistics {
    totalPagos: number;
    pagosPendientes: number;
    pagosCompletados: number;
    pagosFallidos: number;
    montoTotalCompletado: number;
    montoPendiente: number;
    promedioMonto: number;
    distribucienPorMetodo: { [key: string]: number };
    distribucienPorEstado: { [key: string]: number };
}

export class PagoService {
    private pagoRepository: PagoRepository;
    private ordenRepository: OrdenRepository;

    constructor() {
        this.pagoRepository = new PagoRepository(AppDataSource.getRepository(Pago));
        this.ordenRepository = new OrdenRepository();
    }

    async createPago(data: CreatePagoDto): Promise<Pago> {
        // Validaciones
        if (!data.idOrden || data.idOrden <= 0) {
            throw new Error('ID de orden inválido');
        }

        // Verificar que la orden existe
        const ordenExistente = await this.ordenRepository.findById(data.idOrden);
        if (!ordenExistente) {
            throw new Error('La orden no existe');
        }

        if (!data.monto || data.monto <= 0) {
            throw new Error('El monto debe ser mayor a 0');
        }

        if (!data.metodoPago || data.metodoPago.trim().length === 0) {
            throw new Error('El método de pago es requerido');
        }

        // Validar métodos de pago permitidos
        const metodosPermitidos = ['tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo', 'paypal', 'tarjeta_virtual'];
        if (!metodosPermitidos.includes(data.metodoPago.toLowerCase())) {
            throw new Error(`Método de pago no válido. Métodos permitidos: ${metodosPermitidos.join(', ')}`);
        }

        // Validar estados permitidos
        const estadosPermitidos = ['pendiente', 'procesando', 'completado', 'fallido', 'cancelado'];
        const estadoPago = data.estadoPago || 'pendiente';
        if (!estadosPermitidos.includes(estadoPago)) {
            throw new Error(`Estado de pago no válido. Estados permitidos: ${estadosPermitidos.join(', ')}`);
        }

        // Generar hash de transacción único
        const hashTransaccion = this.generateTransactionHash(data.idOrden, data.monto, data.metodoPago);

        // Verificar que el hash no existe (aunque es altamente improbable)
        const hashExistente = await this.pagoRepository.findByHash(hashTransaccion);
        if (hashExistente) {
            throw new Error('Error interno: hash de transacción duplicado');
        }

        const pago = new Pago(
            data.idOrden,
            data.monto,
            data.metodoPago.toLowerCase(),
            estadoPago,
            data.fechaPago || new Date(),
            hashTransaccion
        );

        return await this.pagoRepository.create(pago);
    }

    async getAllPagos(): Promise<Pago[]> {
        return await this.pagoRepository.findAll();
    }

    async getPagoById(id: number): Promise<Pago | null> {
        if (id <= 0) {
            throw new Error('ID de pago inválido');
        }
        return await this.pagoRepository.findById(id);
    }

    async getPagosByOrden(idOrden: number): Promise<Pago[]> {
        if (idOrden <= 0) {
            throw new Error('ID de orden inválido');
        }
        return await this.pagoRepository.findByOrden(idOrden);
    }

    async getPagosByEstado(estadoPago: string): Promise<Pago[]> {
        if (!estadoPago || estadoPago.trim().length === 0) {
            throw new Error('El estado de pago es requerido');
        }
        return await this.pagoRepository.findByEstado(estadoPago.toLowerCase());
    }

    async getPagosByMetodo(metodoPago: string): Promise<Pago[]> {
        if (!metodoPago || metodoPago.trim().length === 0) {
            throw new Error('El método de pago es requerido');
        }
        return await this.pagoRepository.findByMetodoPago(metodoPago.toLowerCase());
    }

    async getPagosByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Pago[]> {
        if (fechaInicio > fechaFin) {
            throw new Error('La fecha de inicio no puede ser mayor a la fecha fin');
        }
        return await this.pagoRepository.findByDateRange(fechaInicio, fechaFin);
    }

    async getPagosByMontoRange(montoMin: number, montoMax: number): Promise<Pago[]> {
        if (montoMin < 0 || montoMax < 0) {
            throw new Error('Los montos no pueden ser negativos');
        }
        if (montoMin > montoMax) {
            throw new Error('El monto mínimo no puede ser mayor al monto máximo');
        }
        return await this.pagoRepository.findByMontoRange(montoMin, montoMax);
    }

    async getPagoByHash(hashTransaccion: string): Promise<Pago | null> {
        if (!hashTransaccion || hashTransaccion.trim().length === 0) {
            throw new Error('El hash de transacción es requerido');
        }
        return await this.pagoRepository.findByHash(hashTransaccion.trim());
    }

    async updatePago(id: number, data: UpdatePagoDto): Promise<Pago | null> {
        if (id <= 0) {
            throw new Error('ID de pago inválido');
        }

        const pagoExistente = await this.pagoRepository.findById(id);
        if (!pagoExistente) {
            throw new Error('Pago no encontrado');
        }

        // Validaciones para los campos que se van a actualizar
        if (data.monto !== undefined && data.monto <= 0) {
            throw new Error('El monto debe ser mayor a 0');
        }

        if (data.metodoPago !== undefined) {
            const metodosPermitidos = ['tarjeta_credito', 'tarjeta_debito', 'transferencia', 'efectivo', 'paypal', 'tarjeta_virtual'];
            if (!metodosPermitidos.includes(data.metodoPago.toLowerCase())) {
                throw new Error(`Método de pago no válido. Métodos permitidos: ${metodosPermitidos.join(', ')}`);
            }
        }

        if (data.estadoPago !== undefined) {
            const estadosPermitidos = ['pendiente', 'procesando', 'completado', 'fallido', 'cancelado'];
            if (!estadosPermitidos.includes(data.estadoPago.toLowerCase())) {
                throw new Error(`Estado de pago no válido. Estados permitidos: ${estadosPermitidos.join(', ')}`);
            }
        }

        // Preparar datos de actualización
        const updateData: Partial<Pago> = {};
        if (data.monto !== undefined) updateData.monto = data.monto;
        if (data.metodoPago !== undefined) updateData.metodoPago = data.metodoPago.toLowerCase();
        if (data.estadoPago !== undefined) updateData.estadoPago = data.estadoPago.toLowerCase();

        return await this.pagoRepository.update(id, updateData);
    }

    async deletePago(id: number): Promise<boolean> {
        if (id <= 0) {
            throw new Error('ID de pago inválido');
        }

        const pagoExistente = await this.pagoRepository.findById(id);
        if (!pagoExistente) {
            throw new Error('Pago no encontrado');
        }

        // Solo permitir eliminar pagos en ciertos estados
        if (['completado'].includes(pagoExistente.estadoPago)) {
            throw new Error('No se puede eliminar un pago completado');
        }

        return await this.pagoRepository.delete(id);
    }

    async procesarPago(id: number): Promise<Pago | null> {
        const pago = await this.pagoRepository.findById(id);
        if (!pago) {
            throw new Error('Pago no encontrado');
        }

        if (pago.estadoPago !== 'pendiente') {
            throw new Error('Solo se pueden procesar pagos pendientes');
        }

        // Simular procesamiento (aquí iría la lógica de integración con pasarela de pago)
        const exito = Math.random() > 0.1; // 90% de éxito
        const nuevoEstado = exito ? 'completado' : 'fallido';

        return await this.updatePago(id, { estadoPago: nuevoEstado });
    }

    async cancelarPago(id: number): Promise<Pago | null> {
        const pago = await this.pagoRepository.findById(id);
        if (!pago) {
            throw new Error('Pago no encontrado');
        }

        if (!['pendiente', 'procesando'].includes(pago.estadoPago)) {
            throw new Error('Solo se pueden cancelar pagos pendientes o en procesamiento');
        }

        return await this.updatePago(id, { estadoPago: 'cancelado' });
    }

    async getPagoStatistics(): Promise<PagoStatistics> {
        const todosPagos = await this.pagoRepository.findAll();
        const distribucienPorEstado = await this.pagoRepository.countByEstado();
        const distribucienPorMetodo = await this.pagoRepository.countByMetodoPago();

        const totalPagos = todosPagos.length;
        const pagosPendientes = todosPagos.filter(p => p.estadoPago === 'pendiente').length;
        const pagosCompletados = todosPagos.filter(p => p.estadoPago === 'completado').length;
        const pagosFallidos = todosPagos.filter(p => p.estadoPago === 'fallido').length;

        const montoTotalCompletado = await this.pagoRepository.getTotalByEstado('completado');
        const montoPendiente = await this.pagoRepository.getTotalByEstado('pendiente');

        const promedioMonto = totalPagos > 0 
            ? todosPagos.reduce((sum, p) => sum + p.monto, 0) / totalPagos 
            : 0;

        return {
            totalPagos,
            pagosPendientes,
            pagosCompletados,
            pagosFallidos,
            montoTotalCompletado,
            montoPendiente,
            promedioMonto: Math.round(promedioMonto * 100) / 100,
            distribucienPorMetodo,
            distribucienPorEstado
        };
    }

    async getPagosRecientes(limite: number = 10): Promise<Pago[]> {
        const pagos = await this.pagoRepository.findAll();
        return pagos.slice(0, limite);
    }

    async getIngresosByPeriodo(fechaInicio: Date, fechaFin: Date): Promise<number> {
        return await this.pagoRepository.getMontoTotalByDateRange(fechaInicio, fechaFin);
    }

    private generateTransactionHash(idOrden: number, monto: number, metodoPago: string): string {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const dataToHash = `${idOrden}-${monto}-${metodoPago}-${timestamp}-${randomString}`;
        
        return crypto.createHash('sha256').update(dataToHash).digest('hex').substring(0, 32);
    }

    private formatDateForSQLite(date: Date): string {
        return date.toISOString().split('T')[0] || '';
    }

    private parseDate(dateString: string): Date {
        return new Date(dateString);
    }
}