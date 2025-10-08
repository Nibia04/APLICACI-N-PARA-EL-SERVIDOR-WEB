import { EmprendedorRepository } from "./EmprendedorRepository.js";
import { Emprendedor } from "./Emprendedor.js";

export class EmprendedorService {
    private emprendedorRepository: EmprendedorRepository;

    constructor() {
        this.emprendedorRepository = new EmprendedorRepository();
    }

    // Crear un nuevo emprendedor con validaciones
    async createEmprendedor(emprendedorData: {
        nombreTienda: string;
        descripcionTienda?: string;
        rating?: number;
    }): Promise<Emprendedor> {
        // Validar que el nombre de tienda sea obligatorio
        if (!emprendedorData.nombreTienda || emprendedorData.nombreTienda.trim() === '') {
            throw new Error('El nombre de la tienda es obligatorio');
        }

        // Validar que el nombre de tienda no exista
        const nombreExists = await this.emprendedorRepository.nombreTiendaExists(emprendedorData.nombreTienda);
        if (nombreExists) {
            throw new Error('Ya existe una tienda con ese nombre');
        }

        // Validar longitud del nombre de tienda
        if (emprendedorData.nombreTienda.length > 100) {
            throw new Error('El nombre de la tienda no puede exceder 100 caracteres');
        }

        // Validar longitud de la descripción
        if (emprendedorData.descripcionTienda && emprendedorData.descripcionTienda.length > 255) {
            throw new Error('La descripción no puede exceder 255 caracteres');
        }

        // Validar rating
        if (emprendedorData.rating !== undefined) {
            if (emprendedorData.rating < 0 || emprendedorData.rating > 5) {
                throw new Error('El rating debe estar entre 0 y 5');
            }
        }

        // Asignar rating inicial si no se proporciona
        const emprendedorToCreate = {
            ...emprendedorData,
            rating: emprendedorData.rating || 0.0
        };

        return await this.emprendedorRepository.create(emprendedorToCreate);
    }

    // Obtener todos los emprendedores
    async getAllEmprendedores(): Promise<Emprendedor[]> {
        return await this.emprendedorRepository.findAll();
    }

    // Obtener todos los emprendedores ordenados alfabéticamente
    async getAllEmprendedoresSortedByName(): Promise<Emprendedor[]> {
        return await this.emprendedorRepository.findAllSortedByName();
    }

    // Obtener todos los emprendedores ordenados por rating
    async getAllEmprendedoresByRating(): Promise<Emprendedor[]> {
        return await this.emprendedorRepository.findAllOrderedByRating();
    }

    // Obtener emprendedor por ID
    async getEmprendedorById(idVendedor: number): Promise<Emprendedor> {
        const emprendedor = await this.emprendedorRepository.findById(idVendedor);
        if (!emprendedor) {
            throw new Error('Emprendedor no encontrado');
        }
        return emprendedor;
    }

    // Obtener emprendedor por nombre de tienda
    async getEmprendedorByNombreTienda(nombreTienda: string): Promise<Emprendedor> {
        const emprendedor = await this.emprendedorRepository.findByNombreTienda(nombreTienda);
        if (!emprendedor) {
            throw new Error('Emprendedor no encontrado');
        }
        return emprendedor;
    }

    // Buscar emprendedores por término de búsqueda
    async searchEmprendedores(searchTerm: string): Promise<Emprendedor[]> {
        if (!searchTerm || searchTerm.trim() === '') {
            return await this.getAllEmprendedores();
        }
        return await this.emprendedorRepository.searchByNombreTienda(searchTerm.trim());
    }

    // Obtener emprendedores por rating mínimo
    async getEmprendedoresByMinRating(minRating: number): Promise<Emprendedor[]> {
        if (minRating < 0 || minRating > 5) {
            throw new Error('El rating mínimo debe estar entre 0 y 5');
        }
        return await this.emprendedorRepository.findByMinRating(minRating);
    }

    // Obtener top emprendedores
    async getTopEmprendedores(limit: number = 10): Promise<Emprendedor[]> {
        if (limit <= 0) {
            throw new Error('El límite debe ser mayor a 0');
        }
        return await this.emprendedorRepository.getTopEmprendedores(limit);
    }

    // Actualizar emprendedor
    async updateEmprendedor(idVendedor: number, emprendedorData: Partial<Emprendedor>): Promise<Emprendedor> {
        // Verificar que el emprendedor existe
        const existingEmprendedor = await this.emprendedorRepository.findById(idVendedor);
        if (!existingEmprendedor) {
            throw new Error('Emprendedor no encontrado');
        }

        // Si se va a actualizar el nombre de tienda, verificar que no exista otro con ese nombre
        if (emprendedorData.nombreTienda) {
            const existingByName = await this.emprendedorRepository.findByNombreTienda(emprendedorData.nombreTienda);
            if (existingByName && existingByName.idVendedor !== idVendedor) {
                throw new Error('Ya existe una tienda con ese nombre');
            }

            // Validar longitud del nombre de tienda
            if (emprendedorData.nombreTienda.length > 100) {
                throw new Error('El nombre de la tienda no puede exceder 100 caracteres');
            }
        }

        // Validar longitud de la descripción
        if (emprendedorData.descripcionTienda && emprendedorData.descripcionTienda.length > 255) {
            throw new Error('La descripción no puede exceder 255 caracteres');
        }

        // Validar rating
        if (emprendedorData.rating !== undefined) {
            if (emprendedorData.rating < 0 || emprendedorData.rating > 5) {
                throw new Error('El rating debe estar entre 0 y 5');
            }
        }

        const updatedEmprendedor = await this.emprendedorRepository.update(idVendedor, emprendedorData);
        if (!updatedEmprendedor) {
            throw new Error('Error al actualizar el emprendedor');
        }
        return updatedEmprendedor;
    }

    // Actualizar rating de emprendedor
    async updateRating(idVendedor: number, newRating: number): Promise<Emprendedor> {
        if (newRating < 0 || newRating > 5) {
            throw new Error('El rating debe estar entre 0 y 5');
        }

        return await this.updateEmprendedor(idVendedor, { rating: newRating });
    }

    // Eliminar emprendedor
    async deleteEmprendedor(idVendedor: number): Promise<void> {
        // Verificar que el emprendedor existe
        const existingEmprendedor = await this.emprendedorRepository.findById(idVendedor);
        if (!existingEmprendedor) {
            throw new Error('Emprendedor no encontrado');
        }

        // TODO: Aquí podrías agregar validación para verificar que no hay productos asociados
        // antes de eliminar el emprendedor

        const deleted = await this.emprendedorRepository.delete(idVendedor);
        if (!deleted) {
            throw new Error('Error al eliminar el emprendedor');
        }
    }

    // Obtener estadísticas de emprendedores
    async getEmprendedorStats(): Promise<{ 
        total: number; 
        conDescripcion: number; 
        sinDescripcion: number;
        ratingPromedio: number;
        conRating: number;
        sinRating: number;
    }> {
        const allEmprendedores = await this.emprendedorRepository.findAll();
        const total = allEmprendedores.length;
        const conDescripcion = allEmprendedores.filter(emp => 
            emp.descripcionTienda && emp.descripcionTienda.trim() !== ''
        ).length;
        const sinDescripcion = total - conDescripcion;

        const conRating = allEmprendedores.filter(emp => 
            emp.rating !== undefined && emp.rating !== null && emp.rating > 0
        ).length;
        const sinRating = total - conRating;

        const ratingPromedio = await this.emprendedorRepository.getAverageRating();

        return { 
            total, 
            conDescripcion, 
            sinDescripcion,
            ratingPromedio: Math.round(ratingPromedio * 100) / 100, // 2 decimales
            conRating,
            sinRating
        };
    }

    // Verificar si un emprendedor existe por nombre de tienda
    async emprendedorExists(nombreTienda: string): Promise<boolean> {
        return await this.emprendedorRepository.nombreTiendaExists(nombreTienda);
    }
}