import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { Emprendedor } from "./Emprendedor.js";

export class EmprendedorRepository {
    private repository: Repository<Emprendedor>;

    constructor() {
        this.repository = AppDataSource.getRepository(Emprendedor);
    }

    // Crear un nuevo emprendedor
    async create(emprendedorData: Partial<Emprendedor>): Promise<Emprendedor> {
        const emprendedor = this.repository.create(emprendedorData);
        return await this.repository.save(emprendedor);
    }

    // Buscar todos los emprendedores
    async findAll(): Promise<Emprendedor[]> {
        return await this.repository.find();
    }

    // Buscar emprendedor por ID
    async findById(idVendedor: number): Promise<Emprendedor | null> {
        return await this.repository.findOne({ where: { idVendedor } });
    }

    // Buscar emprendedor por nombre de tienda
    async findByNombreTienda(nombreTienda: string): Promise<Emprendedor | null> {
        return await this.repository.findOne({ where: { nombreTienda } });
    }

    // Buscar emprendedores que contengan texto en el nombre de tienda
    async searchByNombreTienda(searchTerm: string): Promise<Emprendedor[]> {
        return await this.repository
            .createQueryBuilder("emprendedor")
            .where("emprendedor.nombreTienda LIKE :searchTerm", { 
                searchTerm: `%${searchTerm}%` 
            })
            .getMany();
    }

    // Buscar emprendedores por rating mínimo
    async findByMinRating(minRating: number): Promise<Emprendedor[]> {
        return await this.repository
            .createQueryBuilder("emprendedor")
            .where("emprendedor.rating >= :minRating", { minRating })
            .orderBy("emprendedor.rating", "DESC")
            .getMany();
    }

    // Obtener emprendedores ordenados por rating
    async findAllOrderedByRating(): Promise<Emprendedor[]> {
        return await this.repository.find({
            order: {
                rating: "DESC"
            }
        });
    }

    // Actualizar emprendedor
    async update(idVendedor: number, emprendedorData: Partial<Emprendedor>): Promise<Emprendedor | null> {
        await this.repository.update(idVendedor, emprendedorData);
        return await this.findById(idVendedor);
    }

    // Eliminar emprendedor
    async delete(idVendedor: number): Promise<boolean> {
        const result = await this.repository.delete(idVendedor);
        return result.affected ? result.affected > 0 : false;
    }

    // Verificar si existe un emprendedor con ese nombre de tienda
    async nombreTiendaExists(nombreTienda: string): Promise<boolean> {
        const emprendedor = await this.findByNombreTienda(nombreTienda);
        return emprendedor !== null;
    }

    // Contar total de emprendedores
    async count(): Promise<number> {
        return await this.repository.count();
    }

    // Obtener emprendedores ordenados alfabéticamente por nombre de tienda
    async findAllSortedByName(): Promise<Emprendedor[]> {
        return await this.repository.find({
            order: {
                nombreTienda: "ASC"
            }
        });
    }

    // Obtener top emprendedores por rating
    async getTopEmprendedores(limit: number = 10): Promise<Emprendedor[]> {
        return await this.repository
            .createQueryBuilder("emprendedor")
            .where("emprendedor.rating IS NOT NULL")
            .orderBy("emprendedor.rating", "DESC")
            .limit(limit)
            .getMany();
    }

    // Calcular rating promedio de todos los emprendedores
    async getAverageRating(): Promise<number> {
        const result = await this.repository
            .createQueryBuilder("emprendedor")
            .select("AVG(emprendedor.rating)", "avg")
            .where("emprendedor.rating IS NOT NULL")
            .getRawOne();
        
        return result?.avg ? parseFloat(result.avg) : 0;
    }
}