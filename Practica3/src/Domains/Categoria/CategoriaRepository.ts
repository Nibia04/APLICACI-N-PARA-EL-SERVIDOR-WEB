import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { Categoria } from "./Categoria.js";

export class CategoriaRepository {
    private repository: Repository<Categoria>;

    constructor() {
        this.repository = AppDataSource.getRepository(Categoria);
    }

    // Crear una nueva categoria
    async create(categoriaData: Partial<Categoria>): Promise<Categoria> {
        const categoria = this.repository.create(categoriaData);
        return await this.repository.save(categoria);
    }

    // Buscar todas las categorias
    async findAll(): Promise<Categoria[]> {
        return await this.repository.find();
    }

    // Buscar categoria por ID
    async findById(idCategoria: number): Promise<Categoria | null> {
        return await this.repository.findOne({ where: { idCategoria } });
    }

    // Buscar categoria por nombre
    async findByName(nombreCategoria: string): Promise<Categoria | null> {
        return await this.repository.findOne({ where: { nombreCategoria } });
    }

    // Buscar categorias que contengan texto en el nombre
    async searchByName(searchTerm: string): Promise<Categoria[]> {
        return await this.repository
            .createQueryBuilder("categoria")
            .where("categoria.nombreCategoria LIKE :searchTerm", { 
                searchTerm: `%${searchTerm}%` 
            })
            .getMany();
    }

    // Actualizar categoria
    async update(idCategoria: number, categoriaData: Partial<Categoria>): Promise<Categoria | null> {
        await this.repository.update(idCategoria, categoriaData);
        return await this.findById(idCategoria);
    }

    // Eliminar categoria
    async delete(idCategoria: number): Promise<boolean> {
        const result = await this.repository.delete(idCategoria);
        return result.affected ? result.affected > 0 : false;
    }

    // Verificar si existe una categoria con ese nombre
    async nameExists(nombreCategoria: string): Promise<boolean> {
        const categoria = await this.findByName(nombreCategoria);
        return categoria !== null;
    }

    // Contar total de categorias
    async count(): Promise<number> {
        return await this.repository.count();
    }

    // Obtener categorias ordenadas alfabéticamente
    async findAllSorted(): Promise<Categoria[]> {
        return await this.repository.find({
            order: {
                nombreCategoria: "ASC"
            }
        });
    }
}