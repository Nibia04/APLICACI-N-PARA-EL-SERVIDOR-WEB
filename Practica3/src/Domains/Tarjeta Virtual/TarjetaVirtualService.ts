import { TarjetaVirtualRepository } from "./TarjetaVirtualRepository.js";
import { TarjetaVirtual } from "./TarjetaVirtual.js";
import { UserRepository } from "../Usuario/UserRepository.js";

export class TarjetaVirtualService {
    private tarjetaRepository: TarjetaVirtualRepository;
    private userRepository: UserRepository;

    constructor() {
        this.tarjetaRepository = new TarjetaVirtualRepository();
        this.userRepository = new UserRepository();
    }

    // Estados válidos para las tarjetas virtuales
    private readonly ESTADOS_VALIDOS = [
        'activa',
        'suspendida',
        'vencida',
        'cancelada'
    ];

    // Generar número de tarjeta único
    private generateNumeroTarjeta(): string {
        const timestamp = Date.now().toString();
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `4000${timestamp.slice(-8)}${random}`;
    }

    // Crear una nueva tarjeta virtual con validaciones
    async createTarjetaVirtual(tarjetaData: {
        idUsuario: number;
        saldoDisponible: number;
        fechaExpiracion?: Date;
        estado?: string;
    }): Promise<TarjetaVirtual> {
        // Validar que el usuario existe
        const usuario = await this.userRepository.findById(tarjetaData.idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        // Validar saldo inicial
        if (!tarjetaData.saldoDisponible || tarjetaData.saldoDisponible < 0) {
            throw new Error('El saldo inicial debe ser mayor o igual a 0');
        }

        // Validar saldo máximo
        if (tarjetaData.saldoDisponible > 99999999.99) {
            throw new Error('El saldo excede el límite máximo permitido');
        }

        // Validar estado si se proporciona
        const estado = tarjetaData.estado || 'activa';
        if (!this.ESTADOS_VALIDOS.includes(estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        // Generar fecha de expiración si no se proporciona (2 años por defecto)
        const fechaExpiracion = tarjetaData.fechaExpiracion || new Date();
        if (!tarjetaData.fechaExpiracion) {
            fechaExpiracion.setFullYear(fechaExpiracion.getFullYear() + 2);
        }

        // Validar que la fecha de expiración no sea en el pasado
        if (fechaExpiracion <= new Date()) {
            throw new Error('La fecha de expiración debe ser futura');
        }

        // Generar número de tarjeta único
        let numeroTarjeta: string;
        let intentos = 0;
        do {
            numeroTarjeta = this.generateNumeroTarjeta();
            intentos++;
            if (intentos > 10) {
                throw new Error('No se pudo generar un número de tarjeta único');
            }
        } while (await this.tarjetaRepository.numeroTarjetaExists(numeroTarjeta));

        // Crear la tarjeta
        const tarjetaToCreate = {
            ...tarjetaData,
            numeroTarjeta,
            fechaExpiracion,
            estado
        };

        return await this.tarjetaRepository.create(tarjetaToCreate);
    }

    // Obtener todas las tarjetas virtuales
    async getAllTarjetasVirtuales(): Promise<TarjetaVirtual[]> {
        return await this.tarjetaRepository.findAll();
    }

    // Obtener todas las tarjetas ordenadas por saldo
    async getAllTarjetasOrderedBySaldo(): Promise<TarjetaVirtual[]> {
        return await this.tarjetaRepository.findAllOrderedBySaldo();
    }

    // Obtener tarjeta virtual por ID
    async getTarjetaVirtualById(idTarjeta: number): Promise<TarjetaVirtual> {
        const tarjeta = await this.tarjetaRepository.findById(idTarjeta);
        if (!tarjeta) {
            throw new Error('Tarjeta virtual no encontrada');
        }
        return tarjeta;
    }

    // Obtener tarjeta por número
    async getTarjetaVirtualByNumero(numeroTarjeta: string): Promise<TarjetaVirtual> {
        const tarjeta = await this.tarjetaRepository.findByNumero(numeroTarjeta);
        if (!tarjeta) {
            throw new Error('Tarjeta virtual no encontrada');
        }
        return tarjeta;
    }

    // Obtener tarjetas por usuario
    async getTarjetasByUsuario(idUsuario: number): Promise<TarjetaVirtual[]> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        return await this.tarjetaRepository.findByUsuario(idUsuario);
    }

    // Obtener tarjetas activas por usuario
    async getTarjetasActivasByUsuario(idUsuario: number): Promise<TarjetaVirtual[]> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        return await this.tarjetaRepository.findActivasByUsuario(idUsuario);
    }

    // Obtener tarjetas por estado
    async getTarjetasByEstado(estado: string): Promise<TarjetaVirtual[]> {
        if (!this.ESTADOS_VALIDOS.includes(estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        return await this.tarjetaRepository.findByEstado(estado);
    }

    // Obtener tarjetas próximas a vencer
    async getTarjetasProximasAVencer(dias: number = 30): Promise<TarjetaVirtual[]> {
        if (dias <= 0) {
            throw new Error('El número de días debe ser mayor a 0');
        }

        return await this.tarjetaRepository.findProximasAVencer(dias);
    }

    // Obtener tarjetas con saldo insuficiente
    async getTarjetasConSaldoInsuficiente(montoMinimo: number = 10): Promise<TarjetaVirtual[]> {
        if (montoMinimo < 0) {
            throw new Error('El monto mínimo no puede ser negativo');
        }

        return await this.tarjetaRepository.findConSaldoInsuficiente(montoMinimo);
    }

    // Recargar saldo de tarjeta
    async recargarSaldo(idTarjeta: number, montoRecarga: number): Promise<TarjetaVirtual> {
        if (montoRecarga <= 0) {
            throw new Error('El monto de recarga debe ser mayor a 0');
        }

        const tarjeta = await this.getTarjetaVirtualById(idTarjeta);
        
        // Verificar que la tarjeta esté activa
        if (tarjeta.estado !== 'activa') {
            throw new Error('Solo se puede recargar tarjetas activas');
        }

        // Verificar que no esté vencida
        if (tarjeta.fechaExpiracion <= new Date()) {
            throw new Error('No se puede recargar una tarjeta vencida');
        }

        const nuevoSaldo = tarjeta.saldoDisponible + montoRecarga;
        
        // Validar saldo máximo
        if (nuevoSaldo > 99999999.99) {
            throw new Error('El saldo resultante excede el límite máximo permitido');
        }

        const tarjetaActualizada = await this.tarjetaRepository.updateSaldo(idTarjeta, nuevoSaldo);
        if (!tarjetaActualizada) {
            throw new Error('Error al recargar el saldo');
        }
        return tarjetaActualizada;
    }

    // Debitar saldo de tarjeta
    async debitarSaldo(idTarjeta: number, montoDebito: number): Promise<TarjetaVirtual> {
        if (montoDebito <= 0) {
            throw new Error('El monto a debitar debe ser mayor a 0');
        }

        const tarjeta = await this.getTarjetaVirtualById(idTarjeta);
        
        // Verificar que la tarjeta esté activa
        if (tarjeta.estado !== 'activa') {
            throw new Error('Solo se puede debitar de tarjetas activas');
        }

        // Verificar que no esté vencida
        if (tarjeta.fechaExpiracion <= new Date()) {
            throw new Error('No se puede debitar de una tarjeta vencida');
        }

        // Verificar saldo suficiente
        if (tarjeta.saldoDisponible < montoDebito) {
            throw new Error('Saldo insuficiente');
        }

        const nuevoSaldo = tarjeta.saldoDisponible - montoDebito;
        
        const tarjetaActualizada = await this.tarjetaRepository.updateSaldo(idTarjeta, nuevoSaldo);
        if (!tarjetaActualizada) {
            throw new Error('Error al debitar el saldo');
        }
        return tarjetaActualizada;
    }

    // Cambiar estado de tarjeta
    async cambiarEstadoTarjeta(idTarjeta: number, nuevoEstado: string): Promise<TarjetaVirtual> {
        if (!this.ESTADOS_VALIDOS.includes(nuevoEstado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        const tarjeta = await this.getTarjetaVirtualById(idTarjeta);
        
        // Validaciones de cambios de estado
        if (tarjeta.estado === 'cancelada' && nuevoEstado !== 'cancelada') {
            throw new Error('No se puede reactivar una tarjeta cancelada');
        }

        return await this.updateTarjetaVirtual(idTarjeta, { estado: nuevoEstado });
    }

    // Suspender tarjeta
    async suspenderTarjeta(idTarjeta: number): Promise<TarjetaVirtual> {
        return await this.cambiarEstadoTarjeta(idTarjeta, 'suspendida');
    }

    // Reactivar tarjeta
    async reactivarTarjeta(idTarjeta: number): Promise<TarjetaVirtual> {
        const tarjeta = await this.getTarjetaVirtualById(idTarjeta);
        
        if (tarjeta.estado !== 'suspendida') {
            throw new Error('Solo se pueden reactivar tarjetas suspendidas');
        }

        return await this.cambiarEstadoTarjeta(idTarjeta, 'activa');
    }

    // Cancelar tarjeta
    async cancelarTarjeta(idTarjeta: number): Promise<TarjetaVirtual> {
        return await this.cambiarEstadoTarjeta(idTarjeta, 'cancelada');
    }

    // Actualizar tarjeta virtual
    async updateTarjetaVirtual(idTarjeta: number, tarjetaData: Partial<TarjetaVirtual>): Promise<TarjetaVirtual> {
        // Verificar que la tarjeta existe
        const existingTarjeta = await this.tarjetaRepository.findById(idTarjeta);
        if (!existingTarjeta) {
            throw new Error('Tarjeta virtual no encontrada');
        }

        // Validar estado si se va a actualizar
        if (tarjetaData.estado && !this.ESTADOS_VALIDOS.includes(tarjetaData.estado)) {
            throw new Error(`Estado inválido. Estados válidos: ${this.ESTADOS_VALIDOS.join(', ')}`);
        }

        // Validar saldo si se va a actualizar
        if (tarjetaData.saldoDisponible !== undefined) {
            if (tarjetaData.saldoDisponible < 0) {
                throw new Error('El saldo no puede ser negativo');
            }
            if (tarjetaData.saldoDisponible > 99999999.99) {
                throw new Error('El saldo excede el límite máximo permitido');
            }
        }

        // Validar fecha de expiración si se va a actualizar
        if (tarjetaData.fechaExpiracion && tarjetaData.fechaExpiracion <= new Date()) {
            throw new Error('La fecha de expiración debe ser futura');
        }

        const updatedTarjeta = await this.tarjetaRepository.update(idTarjeta, tarjetaData);
        if (!updatedTarjeta) {
            throw new Error('Error al actualizar la tarjeta virtual');
        }
        return updatedTarjeta;
    }

    // Eliminar tarjeta virtual
    async deleteTarjetaVirtual(idTarjeta: number): Promise<void> {
        // Verificar que la tarjeta existe
        const existingTarjeta = await this.tarjetaRepository.findById(idTarjeta);
        if (!existingTarjeta) {
            throw new Error('Tarjeta virtual no encontrada');
        }

        const deleted = await this.tarjetaRepository.delete(idTarjeta);
        if (!deleted) {
            throw new Error('Error al eliminar la tarjeta virtual');
        }
    }

    // Procesar vencimientos automáticos
    async procesarVencimientos(): Promise<number> {
        const tarjetasVencidas = await this.tarjetaRepository.findVencidas();
        let procesadas = 0;

        for (const tarjeta of tarjetasVencidas) {
            if (tarjeta.estado === 'activa') {
                await this.cambiarEstadoTarjeta(tarjeta.idTarjeta, 'vencida');
                procesadas++;
            }
        }

        return procesadas;
    }

    // Obtener estadísticas de tarjetas virtuales
    async getTarjetaVirtualStats(): Promise<{
        total: number;
        porEstado: Record<string, number>;
        totalSaldoCirculacion: number;
        promedioSaldo: number;
        proximasAVencer: number;
        saldoInsuficiente: number;
    }> {
        const total = await this.tarjetaRepository.count();
        const totalSaldoCirculacion = await this.tarjetaRepository.getTotalSaldoCirculacion();
        const promedioSaldo = await this.tarjetaRepository.getPromedioSaldo();
        const proximasAVencer = (await this.tarjetaRepository.findProximasAVencer(30)).length;
        const saldoInsuficiente = (await this.tarjetaRepository.findConSaldoInsuficiente(10)).length;

        const porEstado: Record<string, number> = {};
        for (const estado of this.ESTADOS_VALIDOS) {
            porEstado[estado] = await this.tarjetaRepository.countByEstado(estado);
        }

        return {
            total,
            porEstado,
            totalSaldoCirculacion: Math.round(totalSaldoCirculacion * 100) / 100,
            promedioSaldo: Math.round(promedioSaldo * 100) / 100,
            proximasAVencer,
            saldoInsuficiente
        };
    }

    // Obtener estados válidos
    getEstadosValidos(): string[] {
        return [...this.ESTADOS_VALIDOS];
    }
}