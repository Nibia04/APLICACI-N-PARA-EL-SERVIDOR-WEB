import { CategoriaRepository } from "./CategoriaRepository.js";
import { Categoria } from "./Categoria.js";

export class CategoriaService {
    private categoriaRepository: CategoriaRepository;

    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    // Crear una nueva categoria con validaciones
    async createCategoria(categoriaData: {
        nombreCategoria: string;
        descripcion?: string;
    }): Promise<Categoria> {
        // Validar que el nombre sea obligatorio
        if (!categoriaData.nombreCategoria || categoriaData.nombreCategoria.trim() === '') {
            throw new Error('El nombre de la categoría es obligatorio');
        }

        // Validar que el nombre no exista
        const nameExists = await this.categoriaRepository.nameExists(categoriaData.nombreCategoria);
        if (nameExists) {
            throw new Error('Ya existe una categoría con ese nombre');
        }

        // Validar longitud del nombre
        if (categoriaData.nombreCategoria.length > 100) {
            throw new Error('El nombre de la categoría no puede exceder 100 caracteres');
        }

        // Validar longitud de la descripción
        if (categoriaData.descripcion && categoriaData.descripcion.length > 255) {
            throw new Error('La descripción no puede exceder 255 caracteres');
        }

        return await this.categoriaRepository.create(categoriaData);
    }

    // Obtener todas las categorias
    async getAllCategorias(): Promise<Categoria[]> {
        return await this.categoriaRepository.findAll();
    }

    // Obtener todas las categorias ordenadas alfabéticamente
    async getAllCategoriasSorted(): Promise<Categoria[]> {
        return await this.categoriaRepository.findAllSorted();
    }

    // Obtener categoria por ID
    async getCategoriaById(idCategoria: number): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findById(idCategoria);
        if (!categoria) {
            throw new Error('Categoría no encontrada');
        }
        return categoria;
    }

    // Obtener categoria por nombre
    async getCategoriaByName(nombreCategoria: string): Promise<Categoria> {
        const categoria = await this.categoriaRepository.findByName(nombreCategoria);
        if (!categoria) {
            throw new Error('Categoría no encontrada');
        }
        return categoria;
    }

    // Buscar categorias por término de búsqueda
    async searchCategorias(searchTerm: string): Promise<Categoria[]> {
        if (!searchTerm || searchTerm.trim() === '') {
            return await this.getAllCategorias();
        }
        return await this.categoriaRepository.searchByName(searchTerm.trim());
    }

    // Actualizar categoria
    async updateCategoria(idCategoria: number, categoriaData: Partial<Categoria>): Promise<Categoria> {
        // Verificar que la categoria existe
        const existingCategoria = await this.categoriaRepository.findById(idCategoria);
        if (!existingCategoria) {
            throw new Error('Categoría no encontrada');
        }

        // Si se va a actualizar el nombre, verificar que no exista otro con ese nombre
        if (categoriaData.nombreCategoria) {
            const existingByName = await this.categoriaRepository.findByName(categoriaData.nombreCategoria);
            if (existingByName && existingByName.idCategoria !== idCategoria) {
                throw new Error('Ya existe una categoría con ese nombre');
            }

            // Validar longitud del nombre
            if (categoriaData.nombreCategoria.length > 100) {
                throw new Error('El nombre de la categoría no puede exceder 100 caracteres');
            }
        }

        // Validar longitud de la descripción
        if (categoriaData.descripcion && categoriaData.descripcion.length > 255) {
            throw new Error('La descripción no puede exceder 255 caracteres');
        }

        const updatedCategoria = await this.categoriaRepository.update(idCategoria, categoriaData);
        if (!updatedCategoria) {
            throw new Error('Error al actualizar la categoría');
        }
        return updatedCategoria;
    }

    // Eliminar categoria
    async deleteCategoria(idCategoria: number): Promise<void> {
        // Verificar que la categoria existe
        const existingCategoria = await this.categoriaRepository.findById(idCategoria);
        if (!existingCategoria) {
            throw new Error('Categoría no encontrada');
        }

        // TODO: Aquí podrías agregar validación para verificar que no hay productos asociados
        // antes de eliminar la categoría

        const deleted = await this.categoriaRepository.delete(idCategoria);
        if (!deleted) {
            throw new Error('Error al eliminar la categoría');
        }
    }

    // Obtener estadísticas de categorias
    async getCategoriaStats(): Promise<{ 
        total: number; 
        conDescripcion: number; 
        sinDescripcion: number;
    }> {
        const allCategorias = await this.categoriaRepository.findAll();
        const total = allCategorias.length;
        const conDescripcion = allCategorias.filter(cat => 
            cat.descripcion && cat.descripcion.trim() !== ''
        ).length;
        const sinDescripcion = total - conDescripcion;

        return { 
            total, 
            conDescripcion, 
            sinDescripcion 
        };
    }

    // Verificar si una categoria existe por nombre
    async categoriaExists(nombreCategoria: string): Promise<boolean> {
        return await this.categoriaRepository.nameExists(nombreCategoria);
    }
}