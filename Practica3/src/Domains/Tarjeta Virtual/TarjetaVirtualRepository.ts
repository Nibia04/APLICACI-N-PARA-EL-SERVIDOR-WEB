import { Repository, Between } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { TarjetaVirtual } from "./TarjetaVirtual.js";

export class TarjetaVirtualRepository {
    private repository: Repository<TarjetaVirtual>;

    constructor() {
        this.repository = AppDataSource.getRepository(TarjetaVirtual);
    }

    // Crear una nueva tarjeta virtual
    async create(tarjetaData: Partial<TarjetaVirtual>): Promise<TarjetaVirtual> {
        const tarjeta = this.repository.create(tarjetaData);
        return await this.repository.save(tarjeta);
    }

    // Buscar todas las tarjetas virtuales
    async findAll(): Promise<TarjetaVirtual[]> {
        return await this.repository.find({
            relations: ['usuario']
        });
    }

    // Buscar tarjeta virtual por ID
    async findById(idTarjeta: number): Promise<TarjetaVirtual | null> {
        return await this.repository.findOne({ 
            where: { idTarjeta },
            relations: ['usuario']
        });
    }

    // Buscar tarjeta por número
    async findByNumero(numeroTarjeta: string): Promise<TarjetaVirtual | null> {
        return await this.repository.findOne({ 
            where: { numeroTarjeta },
            relations: ['usuario']
        });
    }

    // Buscar tarjetas por usuario
    async findByUsuario(idUsuario: number): Promise<TarjetaVirtual[]> {
        return await this.repository.find({ 
            where: { idUsuario },
            relations: ['usuario'],
            order: { fechaExpiracion: "ASC" }
        });
    }

    // Buscar tarjetas por estado
    async findByEstado(estado: string): Promise<TarjetaVirtual[]> {
        return await this.repository.find({ 
            where: { estado },
            relations: ['usuario'],
            order: { fechaExpiracion: "ASC" }
        });
    }

    // Buscar tarjetas activas por usuario
    async findActivasByUsuario(idUsuario: number): Promise<TarjetaVirtual[]> {
        return await this.repository.find({
            where: { 
                idUsuario,
                estado: 'activa'
            },
            relations: ['usuario'],
            order: { saldoDisponible: "DESC" }
        });
    }

    // Buscar tarjetas próximas a vencer
    async findProximasAVencer(dias: number = 30): Promise<TarjetaVirtual[]> {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() + dias);
        
        return await this.repository
            .createQueryBuilder("tarjeta")
            .leftJoinAndSelect("tarjeta.usuario", "usuario")
            .where("tarjeta.fechaExpiracion <= :fechaLimite", { fechaLimite })
            .andWhere("tarjeta.estado = :estado", { estado: 'activa' })
            .orderBy("tarjeta.fechaExpiracion", "ASC")
            .getMany();
    }

    // Buscar tarjetas por rango de saldo
    async findBySaldoRange(minSaldo: number, maxSaldo: number): Promise<TarjetaVirtual[]> {
        return await this.repository
            .createQueryBuilder("tarjeta")
            .leftJoinAndSelect("tarjeta.usuario", "usuario")
            .where("tarjeta.saldoDisponible BETWEEN :minSaldo AND :maxSaldo", { minSaldo, maxSaldo })
            .orderBy("tarjeta.saldoDisponible", "DESC")
            .getMany();
    }

    // Buscar tarjetas con saldo insuficiente
    async findConSaldoInsuficiente(montoMinimo: number = 10): Promise<TarjetaVirtual[]> {
        return await this.repository
            .createQueryBuilder("tarjeta")
            .leftJoinAndSelect("tarjeta.usuario", "usuario")
            .where("tarjeta.saldoDisponible < :montoMinimo", { montoMinimo })
            .andWhere("tarjeta.estado = :estado", { estado: 'activa' })
            .orderBy("tarjeta.saldoDisponible", "ASC")
            .getMany();
    }

    // Obtener tarjetas ordenadas por saldo
    async findAllOrderedBySaldo(): Promise<TarjetaVirtual[]> {
        return await this.repository.find({
            relations: ['usuario'],
            order: {
                saldoDisponible: "DESC"
            }
        });
    }

    // Actualizar tarjeta virtual
    async update(idTarjeta: number, tarjetaData: Partial<TarjetaVirtual>): Promise<TarjetaVirtual | null> {
        await this.repository.update(idTarjeta, tarjetaData);
        return await this.findById(idTarjeta);
    }

    // Actualizar saldo de tarjeta
    async updateSaldo(idTarjeta: number, nuevoSaldo: number): Promise<TarjetaVirtual | null> {
        await this.repository.update(idTarjeta, { saldoDisponible: nuevoSaldo });
        return await this.findById(idTarjeta);
    }

    // Eliminar tarjeta virtual
    async delete(idTarjeta: number): Promise<boolean> {
        const result = await this.repository.delete(idTarjeta);
        return result.affected ? result.affected > 0 : false;
    }

    // Verificar si existe una tarjeta con ese número
    async numeroTarjetaExists(numeroTarjeta: string): Promise<boolean> {
        const tarjeta = await this.findByNumero(numeroTarjeta);
        return tarjeta !== null;
    }

    // Contar total de tarjetas
    async count(): Promise<number> {
        return await this.repository.count();
    }

    // Contar tarjetas por estado
    async countByEstado(estado: string): Promise<number> {
        return await this.repository.count({ where: { estado } });
    }

    // Contar tarjetas por usuario
    async countByUsuario(idUsuario: number): Promise<number> {
        return await this.repository.count({ where: { idUsuario } });
    }

    // Calcular total de saldo en circulación
    async getTotalSaldoCirculacion(): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("tarjeta")
            .select("SUM(tarjeta.saldoDisponible)", "total")
            .where("tarjeta.estado = :estado", { estado: 'activa' })
            .getRawOne();
        
        return result?.total ? parseFloat(result.total) : 0;
    }

    // Calcular saldo promedio
    async getPromedioSaldo(): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("tarjeta")
            .select("AVG(tarjeta.saldoDisponible)", "promedio")
            .where("tarjeta.estado = :estado", { estado: 'activa' })
            .getRawOne();
        
        return result?.promedio ? parseFloat(result.promedio) : 0;
    }

    // Obtener tarjetas vencidas
    async findVencidas(): Promise<TarjetaVirtual[]> {
        const fechaActual = new Date();
        
        return await this.repository
            .createQueryBuilder("tarjeta")
            .leftJoinAndSelect("tarjeta.usuario", "usuario")
            .where("tarjeta.fechaExpiracion < :fechaActual", { fechaActual })
            .orderBy("tarjeta.fechaExpiracion", "DESC")
            .getMany();
    }
}