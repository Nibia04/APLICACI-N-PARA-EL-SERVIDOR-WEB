import { Repository } from 'typeorm';
import { DetalleCarro } from './DetalleCarro.js';

export class DetalleCarroRepository {
    constructor(private repository: Repository<DetalleCarro>) {}

    async create(detalle: DetalleCarro): Promise<DetalleCarro> {
        return await this.repository.save(detalle);
    }

    async findAll(): Promise<DetalleCarro[]> {
        return await this.repository.find({
            relations: ['carrito', 'producto'],
            order: { idDetalleCarrito: 'DESC' }
        });
    }

    async findById(id: number): Promise<DetalleCarro | null> {
        return await this.repository.findOne({
            where: { idDetalleCarrito: id },
            relations: ['carrito', 'producto']
        });
    }

    async findByCarrito(idCarrito: number): Promise<DetalleCarro[]> {
        return await this.repository.find({
            where: { idCarrito },
            relations: ['carrito', 'producto'],
            order: { idDetalleCarrito: 'ASC' }
        });
    }

    async findByProducto(idProducto: number): Promise<DetalleCarro[]> {
        return await this.repository.find({
            where: { idProducto },
            relations: ['carrito', 'producto'],
            order: { idDetalleCarrito: 'DESC' }
        });
    }

    async findByCarritoAndProducto(idCarrito: number, idProducto: number): Promise<DetalleCarro | null> {
        return await this.repository.findOne({
            where: { idCarrito, idProducto },
            relations: ['carrito', 'producto']
        });
    }

    async update(id: number, updateData: Partial<DetalleCarro>): Promise<DetalleCarro | null> {
        await this.repository.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async deleteByCarrito(idCarrito: number): Promise<boolean> {
        const result = await this.repository.delete({ idCarrito });
        return result.affected ? result.affected > 0 : false;
    }

    async deleteByCarritoAndProducto(idCarrito: number, idProducto: number): Promise<boolean> {
        const result = await this.repository.delete({ idCarrito, idProducto });
        return result.affected ? result.affected > 0 : false;
    }

    async getTotalItemsByCarrito(idCarrito: number): Promise<number> {
        const result = await this.repository
            .createQueryBuilder('detalle')
            .select('SUM(detalle.cantidad)', 'total')
            .where('detalle.idCarrito = :idCarrito', { idCarrito })
            .getRawOne();
        
        return parseInt(result.total) || 0;
    }

    async getTotalSubtotalByCarrito(idCarrito: number): Promise<number> {
        const result = await this.repository
            .createQueryBuilder('detalle')
            .select('SUM(detalle.subtotal)', 'total')
            .where('detalle.idCarrito = :idCarrito', { idCarrito })
            .getRawOne();
        
        return parseFloat(result.total) || 0;
    }

    async getProductosMasAgregados(limite: number = 10): Promise<{ idProducto: number, totalCantidad: number, totalVeces: number }[]> {
        const result = await this.repository
            .createQueryBuilder('detalle')
            .select('detalle.idProducto', 'idProducto')
            .addSelect('SUM(detalle.cantidad)', 'totalCantidad')
            .addSelect('COUNT(*)', 'totalVeces')
            .groupBy('detalle.idProducto')
            .orderBy('SUM(detalle.cantidad)', 'DESC')
            .limit(limite)
            .getRawMany();

        return result.map(item => ({
            idProducto: parseInt(item.idProducto),
            totalCantidad: parseInt(item.totalCantidad),
            totalVeces: parseInt(item.totalVeces)
        }));
    }

    async getCarritosConMasItems(limite: number = 10): Promise<{ idCarrito: number, totalItems: number, totalSubtotal: number }[]> {
        const result = await this.repository
            .createQueryBuilder('detalle')
            .select('detalle.idCarrito', 'idCarrito')
            .addSelect('SUM(detalle.cantidad)', 'totalItems')
            .addSelect('SUM(detalle.subtotal)', 'totalSubtotal')
            .groupBy('detalle.idCarrito')
            .orderBy('SUM(detalle.cantidad)', 'DESC')
            .limit(limite)
            .getRawMany();

        return result.map(item => ({
            idCarrito: parseInt(item.idCarrito),
            totalItems: parseInt(item.totalItems),
            totalSubtotal: parseFloat(item.totalSubtotal)
        }));
    }

    async getEstadisticasGenerales(): Promise<{
        totalDetalles: number,
        totalProductosUnicos: number,
        totalCarritosConItems: number,
        promedioItemsPorCarrito: number,
        promedioSubtotalPorCarrito: number
    }> {
        const totalDetalles = await this.repository.count();
        
        const productosUnicos = await this.repository
            .createQueryBuilder('detalle')
            .select('COUNT(DISTINCT detalle.idProducto)', 'total')
            .getRawOne();

        const carritosConItems = await this.repository
            .createQueryBuilder('detalle')
            .select('COUNT(DISTINCT detalle.idCarrito)', 'total')
            .getRawOne();

        const promedios = await this.repository
            .createQueryBuilder('detalle')
            .select('AVG(detalle.cantidad)', 'promedioItems')
            .addSelect('AVG(detalle.subtotal)', 'promedioSubtotal')
            .getRawOne();

        return {
            totalDetalles,
            totalProductosUnicos: parseInt(productosUnicos.total) || 0,
            totalCarritosConItems: parseInt(carritosConItems.total) || 0,
            promedioItemsPorCarrito: parseFloat(promedios.promedioItems) || 0,
            promedioSubtotalPorCarrito: parseFloat(promedios.promedioSubtotal) || 0
        };
    }
}