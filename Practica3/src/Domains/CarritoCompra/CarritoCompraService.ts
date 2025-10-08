import { CarritoCompraRepository } from "./CarritoCompraRepository.js";
import { CarritoCompra } from "./CarritoCompra.js";
import { UserRepository } from "../Usuario/UserRepository.js";

export class CarritoCompraService {
    private carritoRepository: CarritoCompraRepository;
    private userRepository: UserRepository;

    constructor() {
        this.carritoRepository = new CarritoCompraRepository();
        this.userRepository = new UserRepository();
    }

    // Crear un nuevo carrito de compra con validaciones
    async createCarritoCompra(carritoData: {
        idUsuario: number;
    }): Promise<CarritoCompra> {
        // Validar que el usuario existe
        const usuario = await this.userRepository.findById(carritoData.idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        // Verificar si el usuario ya tiene un carrito activo reciente (menos de 24 horas)
        const carritoExistente = await this.carritoRepository.findByUsuario(carritoData.idUsuario);
        if (carritoExistente) {
            const fechaCreacion = new Date(carritoExistente.fechaCreacion);
            const horasTranscurridas = (new Date().getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60);
            if (horasTranscurridas < 24) {
                // Retornar el carrito existente si es reciente
                return carritoExistente;
            }
        }

        // Crear el carrito
        const carritoToCreate = {
            ...carritoData,
            fechaCreacion: new Date()
        };

        return await this.carritoRepository.create(carritoToCreate);
    }

    // Obtener todos los carritos - FindAll()
    async getAllCarritos(): Promise<CarritoCompra[]> {
        return await this.carritoRepository.findAll();
    }

    // Obtener todos los carritos ordenados por fecha - FindAll()
    async getAllCarritosOrderedByDate(): Promise<CarritoCompra[]> {
        return await this.carritoRepository.findAllOrderedByDate();
    }

    // Obtener carrito por ID - FindOne()
    async getCarritoById(idCarrito: number): Promise<CarritoCompra> {
        const carrito = await this.carritoRepository.findById(idCarrito);
        if (!carrito) {
            throw new Error('Carrito de compra no encontrado');
        }
        return carrito;
    }

    // Obtener carrito activo por usuario - FindOne()
    async getCarritoByUsuario(idUsuario: number): Promise<CarritoCompra | null> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        return await this.carritoRepository.findByUsuario(idUsuario);
    }

    // Obtener o crear carrito para usuario - FindOne() + Create()
    async getOrCreateCarritoForUsuario(idUsuario: number): Promise<CarritoCompra> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        // Buscar carrito existente
        let carrito = await this.carritoRepository.findByUsuario(idUsuario);
        
        // Si no existe o es muy antiguo (más de 24 horas), crear uno nuevo
        if (!carrito || this.isCarritoExpired(carrito)) {
            carrito = await this.createCarritoCompra({ idUsuario });
        }

        return carrito;
    }

    // Verificar si un carrito está expirado (más de 24 horas) - Helper
    private isCarritoExpired(carrito: CarritoCompra): boolean {
        const fechaCreacion = new Date(carrito.fechaCreacion);
        const horasTranscurridas = (new Date().getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60);
        return horasTranscurridas > 24;
    }

    // Obtener todos los carritos de un usuario - FindAll()
    async getAllCarritosByUsuario(idUsuario: number): Promise<CarritoCompra[]> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        return await this.carritoRepository.findAllByUsuario(idUsuario);
    }

    // Obtener carritos por rango de fechas - FindAll()
    async getCarritosByDateRange(fechaInicio: Date, fechaFin: Date): Promise<CarritoCompra[]> {
        if (fechaInicio > fechaFin) {
            throw new Error('La fecha de inicio no puede ser mayor a la fecha de fin');
        }

        return await this.carritoRepository.findByDateRange(fechaInicio, fechaFin);
    }

    // Obtener carritos creados hoy - FindAll()
    async getCarritosCreatedToday(): Promise<CarritoCompra[]> {
        return await this.carritoRepository.findCreatedToday();
    }

    // Obtener carritos recientes - FindAll()
    async getCarritosRecientes(dias: number = 7): Promise<CarritoCompra[]> {
        if (dias <= 0) {
            throw new Error('El número de días debe ser mayor a 0');
        }

        return await this.carritoRepository.findRecent(dias);
    }

    // Obtener carritos antiguos - FindAll()
    async getCarritosAntiguos(dias: number = 30): Promise<CarritoCompra[]> {
        if (dias <= 0) {
            throw new Error('El número de días debe ser mayor a 0');
        }

        return await this.carritoRepository.findOlderThan(dias);
    }

    // Obtener carritos más recientes (limitado)
    async getLatestCarritos(limit: number = 10): Promise<CarritoCompra[]> {
        if (limit <= 0) {
            throw new Error('El límite debe ser mayor a 0');
        }

        return await this.carritoRepository.findLatest(limit);
    }

    // Actualizar carrito - FindOne() + Update()
    async updateCarrito(idCarrito: number, carritoData: Partial<CarritoCompra>): Promise<CarritoCompra> {
        // Verificar que el carrito existe
        const existingCarrito = await this.carritoRepository.findById(idCarrito);
        if (!existingCarrito) {
            throw new Error('Carrito de compra no encontrado');
        }

        // Validar usuario si se va a actualizar
        if (carritoData.idUsuario) {
            const usuario = await this.userRepository.findById(carritoData.idUsuario);
            if (!usuario) {
                throw new Error('El usuario especificado no existe');
            }
        }

        const updatedCarrito = await this.carritoRepository.update(idCarrito, carritoData);
        if (!updatedCarrito) {
            throw new Error('Error al actualizar el carrito de compra');
        }
        return updatedCarrito;
    }

    // Eliminar carrito - Remove()
    async deleteCarrito(idCarrito: number): Promise<void> {
        // Verificar que el carrito existe
        const existingCarrito = await this.carritoRepository.findById(idCarrito);
        if (!existingCarrito) {
            throw new Error('Carrito de compra no encontrado');
        }

        const deleted = await this.carritoRepository.delete(idCarrito);
        if (!deleted) {
            throw new Error('Error al eliminar el carrito de compra');
        }
    }

    // Vaciar carrito de usuario - Remove() all carritos for user
    async vaciarCarritoUsuario(idUsuario: number): Promise<void> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        const carritoActivo = await this.carritoRepository.findByUsuario(idUsuario);
        if (carritoActivo) {
            await this.deleteCarrito(carritoActivo.idCarrito);
        }
    }

    // Eliminar todos los carritos de un usuario - Remove() all carritos for user
    async deleteAllCarritosByUsuario(idUsuario: number): Promise<number> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        return await this.carritoRepository.deleteAllByUsuario(idUsuario);
    }

    // Limpiar carritos expirados automáticamente
    async limpiarCarritosExpirados(diasExpiracion: number = 7): Promise<number> {
        if (diasExpiracion <= 0) {
            throw new Error('Los días de expiración deben ser mayor a 0');
        }

        return await this.carritoRepository.cleanOldCarritos(diasExpiracion);
    }

    // Verificar si usuario tiene carrito activo
    async usuarioTieneCarritoActivo(idUsuario: number): Promise<boolean> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        const carrito = await this.carritoRepository.findByUsuario(idUsuario);
        return carrito !== null && !this.isCarritoExpired(carrito);
    }

    // Obtener estadísticas de carritos
    async getCarritoStats(): Promise<{
        total: number;
        creadosHoy: number;
        recientes: number;
        antiguos: number;
        promedioCarritosPorUsuario: number;
    }> {
        const total = await this.carritoRepository.count();
        const creadosHoy = await this.carritoRepository.countCreatedToday();
        const recientes = (await this.carritoRepository.findRecent(7)).length;
        const antiguos = (await this.carritoRepository.findOlderThan(30)).length;

        // Calcular promedio de carritos por usuario
        const allUsers = await this.userRepository.findAll();
        const totalUsuarios = allUsers.length;
        const promedioCarritosPorUsuario = totalUsuarios > 0 ? Math.round((total / totalUsuarios) * 100) / 100 : 0;

        return {
            total,
            creadosHoy,
            recientes,
            antiguos,
            promedioCarritosPorUsuario
        };
    }

    // Obtener estadísticas por usuario
    async getCarritoStatsByUsuario(idUsuario: number): Promise<{
        totalCarritos: number;
        carritoActivo: boolean;
        ultimoCarrito?: Date | undefined;
    }> {
        // Verificar que el usuario existe
        const usuario = await this.userRepository.findById(idUsuario);
        if (!usuario) {
            throw new Error('El usuario especificado no existe');
        }

        const totalCarritos = await this.carritoRepository.countByUsuario(idUsuario);
        const carritoActivo = await this.usuarioTieneCarritoActivo(idUsuario);
        
        const carritos = await this.carritoRepository.findAllByUsuario(idUsuario);
        const ultimoCarrito = carritos.length > 0 ? carritos[0]?.fechaCreacion : undefined;

        return {
            totalCarritos,
            carritoActivo,
            ultimoCarrito
        };
    }

    // Obtener estadísticas mensuales
    async getMonthlyStats(año: number, mes: number): Promise<number> {
        if (año < 2000 || año > 3000) {
            throw new Error('Año inválido');
        }
        if (mes < 1 || mes > 12) {
            throw new Error('Mes inválido (debe estar entre 1 y 12)');
        }

        return await this.carritoRepository.getMonthlyStats(año, mes);
    }
}