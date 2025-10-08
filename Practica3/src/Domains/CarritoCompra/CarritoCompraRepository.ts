import { Repository, Between } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { CarritoCompra } from "./CarritoCompra.js";

export class CarritoCompraRepository {
    private repository: Repository<CarritoCompra>;

    constructor() {
        this.repository = AppDataSource.getRepository(CarritoCompra);
    }

    // Crear un nuevo carrito de compra
    async create(carritoData: Partial<CarritoCompra>): Promise<CarritoCompra> {
        const carrito = this.repository.create(carritoData);
        return await this.repository.save(carrito);
    }

    // Buscar todos los carritos de compra
    async findAll(): Promise<CarritoCompra[]> {
        return await this.repository.find({
            relations: ['usuario']
        });
    }

    // Buscar carrito por ID
    async findById(idCarrito: number): Promise<CarritoCompra | null> {
        return await this.repository.findOne({ 
            where: { idCarrito },
            relations: ['usuario']
        });
    }

    // Buscar carrito por usuario (uno activo)
    async findByUsuario(idUsuario: number): Promise<CarritoCompra | null> {
        return await this.repository.findOne({ 
            where: { idUsuario },
            relations: ['usuario'],
            order: { fechaCreacion: "DESC" }
        });
    }

    // Buscar todos los carritos de un usuario
    async findAllByUsuario(idUsuario: number): Promise<CarritoCompra[]> {
        return await this.repository.find({ 
            where: { idUsuario },
            relations: ['usuario'],
            order: { fechaCreacion: "DESC" }
        });
    }

    // Buscar carritos por rango de fechas
    async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<CarritoCompra[]> {
        return await this.repository.find({
            where: {
                fechaCreacion: Between(fechaInicio, fechaFin)
            },
            relations: ['usuario'],
            order: { fechaCreacion: "DESC" }
        });
    }

    // Buscar carritos creados hoy
    async findCreatedToday(): Promise<CarritoCompra[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return await this.repository.find({
            where: {
                fechaCreacion: Between(today, tomorrow)
            },
            relations: ['usuario'],
            order: { fechaCreacion: "DESC" }
        });
    }

    // Buscar carritos antiguos (más de N días)
    async findOlderThan(dias: number): Promise<CarritoCompra[]> {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - dias);

        return await this.repository
            .createQueryBuilder("carrito")
            .leftJoinAndSelect("carrito.usuario", "usuario")
            .where("carrito.fechaCreacion < :fechaLimite", { fechaLimite })
            .orderBy("carrito.fechaCreacion", "ASC")
            .getMany();
    }

    // Buscar carritos recientes (últimos N días)
    async findRecent(dias: number = 7): Promise<CarritoCompra[]> {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - dias);

        return await this.repository.find({
            where: {
                fechaCreacion: Between(fechaLimite, new Date())
            },
            relations: ['usuario'],
            order: { fechaCreacion: "DESC" }
        });
    }

    // Obtener carritos ordenados por fecha
    async findAllOrderedByDate(): Promise<CarritoCompra[]> {
        return await this.repository.find({
            relations: ['usuario'],
            order: {
                fechaCreacion: "DESC"
            }
        });
    }

    // Actualizar carrito
    async update(idCarrito: number, carritoData: Partial<CarritoCompra>): Promise<CarritoCompra | null> {
        await this.repository.update(idCarrito, carritoData);
        return await this.findById(idCarrito);
    }

    // Eliminar carrito
    async delete(idCarrito: number): Promise<boolean> {
        const result = await this.repository.delete(idCarrito);
        return result.affected ? result.affected > 0 : false;
    }

    // Eliminar todos los carritos de un usuario
    async deleteAllByUsuario(idUsuario: number): Promise<number> {
        const result = await this.repository.delete({ idUsuario });
        return result.affected || 0;
    }

    // Contar total de carritos
    async count(): Promise<number> {
        return await this.repository.count();
    }

    // Contar carritos por usuario
    async countByUsuario(idUsuario: number): Promise<number> {
        return await this.repository.count({ where: { idUsuario } });
    }

    // Contar carritos creados hoy
    async countCreatedToday(): Promise<number> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return await this.repository.count({
            where: {
                fechaCreacion: Between(today, tomorrow)
            }
        });
    }

    // Verificar si un usuario tiene carrito activo
    async hasActiveCarrito(idUsuario: number): Promise<boolean> {
        const carrito = await this.findByUsuario(idUsuario);
        return carrito !== null;
    }

    // Obtener estadísticas por mes
    async getMonthlyStats(año: number, mes: number): Promise<number> {
        const fechaInicio = new Date(año, mes - 1, 1);
        const fechaFin = new Date(año, mes, 0, 23, 59, 59);

        return await this.repository.count({
            where: {
                fechaCreacion: Between(fechaInicio, fechaFin)
            }
        });
    }

    // Limpiar carritos antiguos
    async cleanOldCarritos(diasAntiguedad: number): Promise<number> {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - diasAntiguedad);

        const result = await this.repository
            .createQueryBuilder()
            .delete()
            .from(CarritoCompra)
            .where("fechaCreacion < :fechaLimite", { fechaLimite })
            .execute();

        return result.affected || 0;
    }

    // Obtener carritos más recientes (límite de cantidad)
    async findLatest(limit: number = 10): Promise<CarritoCompra[]> {
        return await this.repository.find({
            relations: ['usuario'],
            order: { fechaCreacion: "DESC" },
            take: limit
        });
    }
}