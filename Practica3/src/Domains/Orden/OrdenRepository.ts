import { Repository, Between } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { Orden } from "./Orden.js";

export class OrdenRepository {
    private repository: Repository<Orden>;

    constructor() {
        this.repository = AppDataSource.getRepository(Orden);
    }

    // Crear una nueva orden
    async create(ordenData: Partial<Orden>): Promise<Orden> {
        const orden = this.repository.create(ordenData);
        return await this.repository.save(orden);
    }

    // Buscar todas las ordenes
    async findAll(): Promise<Orden[]> {
        return await this.repository.find({
            relations: ['usuario']
        });
    }

    // Buscar orden por ID
    async findById(idOrden: number): Promise<Orden | null> {
        return await this.repository.findOne({ 
            where: { idOrden },
            relations: ['usuario']
        });
    }

    // Buscar ordenes por usuario
    async findByUsuario(idUsuario: number): Promise<Orden[]> {
        return await this.repository.find({ 
            where: { idUsuario },
            relations: ['usuario'],
            order: { fechaOrden: "DESC" }
        });
    }

    // Buscar ordenes por estado
    async findByEstado(estado: string): Promise<Orden[]> {
        return await this.repository.find({ 
            where: { estado },
            relations: ['usuario'],
            order: { fechaOrden: "DESC" }
        });
    }

    // Buscar ordenes por rango de fechas
    async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Orden[]> {
        return await this.repository.find({
            where: {
                fechaOrden: Between(fechaInicio, fechaFin)
            },
            relations: ['usuario'],
            order: { fechaOrden: "DESC" }
        });
    }

    // Buscar ordenes por rango de total
    async findByTotalRange(minTotal: number, maxTotal: number): Promise<Orden[]> {
        return await this.repository
            .createQueryBuilder("orden")
            .leftJoinAndSelect("orden.usuario", "usuario")
            .where("orden.total BETWEEN :minTotal AND :maxTotal", { minTotal, maxTotal })
            .orderBy("orden.fechaOrden", "DESC")
            .getMany();
    }

    // Obtener ordenes ordenadas por fecha
    async findAllOrderedByDate(): Promise<Orden[]> {
        return await this.repository.find({
            relations: ['usuario'],
            order: {
                fechaOrden: "DESC"
            }
        });
    }

    // Obtener ordenes ordenadas por total
    async findAllOrderedByTotal(): Promise<Orden[]> {
        return await this.repository.find({
            relations: ['usuario'],
            order: {
                total: "DESC"
            }
        });
    }

    // Actualizar orden
    async update(idOrden: number, ordenData: Partial<Orden>): Promise<Orden | null> {
        await this.repository.update(idOrden, ordenData);
        return await this.findById(idOrden);
    }

    // Eliminar orden
    async delete(idOrden: number): Promise<boolean> {
        const result = await this.repository.delete(idOrden);
        return result.affected ? result.affected > 0 : false;
    }

    // Contar total de ordenes
    async count(): Promise<number> {
        return await this.repository.count();
    }

    // Contar ordenes por estado
    async countByEstado(estado: string): Promise<number> {
        return await this.repository.count({ where: { estado } });
    }

    // Contar ordenes por usuario
    async countByUsuario(idUsuario: number): Promise<number> {
        return await this.repository.count({ where: { idUsuario } });
    }

    // Calcular total de ventas
    async getTotalVentas(): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("orden")
            .select("SUM(orden.total)", "total")
            .where("orden.estado != :estado", { estado: "cancelada" })
            .getRawOne();
        
        return result?.total ? parseFloat(result.total) : 0;
    }

    // Calcular total de ventas por usuario
    async getTotalVentasByUsuario(idUsuario: number): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("orden")
            .select("SUM(orden.total)", "total")
            .where("orden.idUsuario = :idUsuario", { idUsuario })
            .andWhere("orden.estado != :estado", { estado: "cancelada" })
            .getRawOne();
        
        return result?.total ? parseFloat(result.total) : 0;
    }

    // Obtener promedio de total por orden
    async getPromedioTotal(): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("orden")
            .select("AVG(orden.total)", "promedio")
            .where("orden.estado != :estado", { estado: "cancelada" })
            .getRawOne();
        
        return result?.promedio ? parseFloat(result.promedio) : 0;
    }

    // Obtener ordenes recientes (últimos N días)
    async getOrdenesRecientes(dias: number = 7): Promise<Orden[]> {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - dias);
        
        return await this.repository.find({
            where: {
                fechaOrden: Between(fechaLimite, new Date())
            },
            relations: ['usuario'],
            order: { fechaOrden: "DESC" }
        });
    }
}