import { Repository } from 'typeorm';
import { Producto } from './Producto.js';

export class ProductoRepository {
    constructor(private repository: Repository<Producto>) {}

    async create(producto: Producto): Promise<Producto> {
        return await this.repository.save(producto);
    }

    async findAll(): Promise<Producto[]> {
        return await this.repository.find({
            relations: ['emprendedor'],
            order: { idProducto: 'DESC' }
        });
    }

    async findById(id: number): Promise<Producto | null> {
        return await this.repository.findOne({
            where: { idProducto: id },
            relations: ['emprendedor']
        });
    }

    async findByVendedor(idVendedor: number): Promise<Producto[]> {
        return await this.repository.find({
            where: { idVendedor },
            relations: ['emprendedor'],
            order: { nombreProducto: 'ASC' }
        });
    }

    async findByCategoria(categoria: string): Promise<Producto[]> {
        return await this.repository.find({
            where: { categoria },
            relations: ['emprendedor'],
            order: { precio: 'ASC' }
        });
    }

    async findByPriceRange(minPrecio: number, maxPrecio: number): Promise<Producto[]> {
        return await this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.emprendedor', 'emprendedor')
            .where('producto.precio >= :minPrecio', { minPrecio })
            .andWhere('producto.precio <= :maxPrecio', { maxPrecio })
            .orderBy('producto.precio', 'ASC')
            .getMany();
    }

    async findInStock(): Promise<Producto[]> {
        return await this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.emprendedor', 'emprendedor')
            .where('producto.stock > 0')
            .orderBy('producto.stock', 'DESC')
            .getMany();
    }

    async searchByName(nombre: string): Promise<Producto[]> {
        return await this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.emprendedor', 'emprendedor')
            .where('producto.nombreProducto LIKE :nombre', { nombre: `%${nombre}%` })
            .orderBy('producto.nombreProducto', 'ASC')
            .getMany();
    }

    async update(id: number, updateData: Partial<Producto>): Promise<Producto | null> {
        await this.repository.update(id, updateData);
        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }

    async updateStock(id: number, nuevoStock: number): Promise<Producto | null> {
        await this.repository.update(id, { stock: nuevoStock });
        return this.findById(id);
    }

    async getProductCount(): Promise<number> {
        return await this.repository.count();
    }

    async getProductsByStockLevel(nivel: 'bajo' | 'medio' | 'alto'): Promise<Producto[]> {
        const queryBuilder = this.repository
            .createQueryBuilder('producto')
            .leftJoinAndSelect('producto.emprendedor', 'emprendedor');
        
        switch (nivel) {
            case 'bajo':
                queryBuilder.where('producto.stock <= 10');
                break;
            case 'medio':
                queryBuilder.where('producto.stock > 10 AND producto.stock <= 50');
                break;
            case 'alto':
                queryBuilder.where('producto.stock > 50');
                break;
        }

        return await queryBuilder
            .orderBy('producto.stock', 'ASC')
            .getMany();
    }
}