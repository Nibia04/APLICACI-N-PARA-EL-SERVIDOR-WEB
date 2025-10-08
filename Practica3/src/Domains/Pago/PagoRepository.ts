import { Repository } from 'typeorm';
import { Pago } from './Pago.js';

export class PagoRepository {
    constructor(private repository: Repository<Pago>) {}

    async create(pago: Pago): Promise<Pago> {
        return await this.repository.save(pago);
    }

    async findAll(): Promise<Pago[]> {
        return await this.repository.find({
            relations: ['orden'],
            order: { fechaPago: 'DESC' }
        });
    }

    async findById(id: number): Promise<Pago | null> {
        return await this.repository.findOne({
            where: { idPago: id },
            relations: ['orden']
        });
    }

    async findByOrden(idOrden: number): Promise<Pago[]> {
        return await this.repository.find({
            where: { idOrden },
            relations: ['orden'],
            order: { fechaPago: 'DESC' }
        });
    }

    async findByEstado(estadoPago: string): Promise<Pago[]> {
        return await this.repository.find({
            where: { estadoPago },
            relations: ['orden'],
            order: { fechaPago: 'DESC' }
        });
    }

    async findByMetodoPago(metodoPago: string): Promise<Pago[]> {
        return await this.repository.find({
            where: { metodoPago },
            relations: ['orden'],
            order: { fechaPago: 'DESC' }
        });
    }

    async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Pago[]> {
        return await this.repository
            .createQueryBuilder('pago')
            .leftJoinAndSelect('pago.orden', 'orden')
            .where('pago.fechaPago >= :fechaInicio', { fechaInicio })
            .andWhere('pago.fechaPago <= :fechaFin', { fechaFin })
            .orderBy('pago.fechaPago', 'DESC')
            .getMany();
    }

    async findByMontoRange(montoMin: number, montoMax: number): Promise<Pago[]> {
        return await this.repository
            .createQueryBuilder('pago')
            .leftJoinAndSelect('pago.orden', 'orden')
            .where('pago.monto >= :montoMin', { montoMin })
            .andWhere('pago.monto <= :montoMax', { montoMax })
            .orderBy('pago.monto', 'DESC')
            .getMany();
    }

    async findByHash(hashTransaccion: string): Promise<Pago | null> {
        return await this.repository.findOne({
            where: { hashTransaccion },
            relations: ['orden']
        });
    }

    async update(id: number, updateData: Partial<Pago>): Promise<Pago | null> {
        await this.repository.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async getPagosExitosos(): Promise<Pago[]> {
        return await this.repository.find({
            where: { estadoPago: 'completado' },
            relations: ['orden'],
            order: { fechaPago: 'DESC' }
        });
    }

    async getPagosPendientes(): Promise<Pago[]> {
        return await this.repository.find({
            where: { estadoPago: 'pendiente' },
            relations: ['orden'],
            order: { fechaPago: 'ASC' }
        });
    }

    async getPagosFallidos(): Promise<Pago[]> {
        return await this.repository.find({
            where: { estadoPago: 'fallido' },
            relations: ['orden'],
            order: { fechaPago: 'DESC' }
        });
    }

    async getTotalByEstado(estadoPago: string): Promise<number> {
        const result = await this.repository
            .createQueryBuilder('pago')
            .select('SUM(pago.monto)', 'total')
            .where('pago.estadoPago = :estadoPago', { estadoPago })
            .getRawOne();
        
        return parseFloat(result.total) || 0;
    }

    async getMontoTotalByDateRange(fechaInicio: Date, fechaFin: Date): Promise<number> {
        const result = await this.repository
            .createQueryBuilder('pago')
            .select('SUM(pago.monto)', 'total')
            .where('pago.fechaPago >= :fechaInicio', { fechaInicio })
            .andWhere('pago.fechaPago <= :fechaFin', { fechaFin })
            .andWhere('pago.estadoPago = :estado', { estado: 'completado' })
            .getRawOne();
        
        return parseFloat(result.total) || 0;
    }

    async countByEstado(): Promise<{ [key: string]: number }> {
        const result = await this.repository
            .createQueryBuilder('pago')
            .select('pago.estadoPago', 'estado')
            .addSelect('COUNT(*)', 'count')
            .groupBy('pago.estadoPago')
            .getRawMany();

        const estadisticas: { [key: string]: number } = {};
        result.forEach(item => {
            estadisticas[item.estado] = parseInt(item.count);
        });

        return estadisticas;
    }

    async countByMetodoPago(): Promise<{ [key: string]: number }> {
        const result = await this.repository
            .createQueryBuilder('pago')
            .select('pago.metodoPago', 'metodo')
            .addSelect('COUNT(*)', 'count')
            .groupBy('pago.metodoPago')
            .getRawMany();

        const estadisticas: { [key: string]: number } = {};
        result.forEach(item => {
            estadisticas[item.metodo] = parseInt(item.count);
        });

        return estadisticas;
    }
}