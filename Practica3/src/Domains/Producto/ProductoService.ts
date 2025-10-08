import { ProductoRepository } from './ProductoRepository.js';
import { Producto } from './Producto.js';
import { AppDataSource } from '../../data-source.js';
import { EmprendedorRepository } from '../Emprendedor/EmprendedorRepository.js';

export interface CreateProductoDto {
    idVendedor: number;
    nombreProducto: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagenURL?: string;
}

export interface UpdateProductoDto {
    nombreProducto?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    categoria?: string;
    imagenURL?: string;
}

export interface ProductStatistics {
    total: number;
    enStock: number;
    sinStock: number;
    stockBajo: number;
    promedioPrice: number;
    categorias: { [key: string]: number };
}

export class ProductoService {
    private productoRepository: ProductoRepository;
    private emprendedorRepository: EmprendedorRepository;

    constructor() {
        this.productoRepository = new ProductoRepository(AppDataSource.getRepository(Producto));
        this.emprendedorRepository = new EmprendedorRepository();
    }

    async createProducto(data: CreateProductoDto): Promise<Producto> {
        // Validaciones
        if (!data.idVendedor || data.idVendedor <= 0) {
            throw new Error('ID de vendedor inválido');
        }

        // Verificar que el emprendedor existe
        const emprendedorExistente = await this.emprendedorRepository.findById(data.idVendedor);
        if (!emprendedorExistente) {
            throw new Error('El emprendedor no existe');
        }

        if (!data.nombreProducto || data.nombreProducto.trim().length === 0) {
            throw new Error('El nombre del producto es requerido');
        }

        if (!data.descripcion || data.descripcion.trim().length === 0) {
            throw new Error('La descripción del producto es requerida');
        }

        if (data.precio <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }

        if (data.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        if (!data.categoria || data.categoria.trim().length === 0) {
            throw new Error('La categoría es requerida');
        }

        const producto = new Producto(
            data.idVendedor,
            data.nombreProducto.trim(),
            data.descripcion.trim(),
            data.precio,
            data.stock,
            data.categoria.trim(),
            data.imagenURL?.trim()
        );

        return await this.productoRepository.create(producto);
    }

    async getAllProductos(): Promise<Producto[]> {
        return await this.productoRepository.findAll();
    }

    async getProductoById(id: number): Promise<Producto | null> {
        if (id <= 0) {
            throw new Error('ID de producto inválido');
        }
        return await this.productoRepository.findById(id);
    }

    async getProductosByVendedor(idVendedor: number): Promise<Producto[]> {
        if (idVendedor <= 0) {
            throw new Error('ID de vendedor inválido');
        }
        return await this.productoRepository.findByVendedor(idVendedor);
    }

    async getProductosByCategoria(categoria: string): Promise<Producto[]> {
        if (!categoria || categoria.trim().length === 0) {
            throw new Error('La categoría es requerida');
        }
        return await this.productoRepository.findByCategoria(categoria.trim());
    }

    async getProductosByPriceRange(minPrecio: number, maxPrecio: number): Promise<Producto[]> {
        if (minPrecio < 0 || maxPrecio < 0) {
            throw new Error('Los precios no pueden ser negativos');
        }
        if (minPrecio > maxPrecio) {
            throw new Error('El precio mínimo no puede ser mayor al precio máximo');
        }
        return await this.productoRepository.findByPriceRange(minPrecio, maxPrecio);
    }

    async getProductosInStock(): Promise<Producto[]> {
        return await this.productoRepository.findInStock();
    }

    async searchProductosByName(nombre: string): Promise<Producto[]> {
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('El nombre de búsqueda es requerido');
        }
        return await this.productoRepository.searchByName(nombre.trim());
    }

    async updateProducto(id: number, data: UpdateProductoDto): Promise<Producto | null> {
        if (id <= 0) {
            throw new Error('ID de producto inválido');
        }

        const productoExistente = await this.productoRepository.findById(id);
        if (!productoExistente) {
            throw new Error('Producto no encontrado');
        }

        // Validaciones para los campos que se van a actualizar
        if (data.precio !== undefined && data.precio <= 0) {
            throw new Error('El precio debe ser mayor a 0');
        }

        if (data.stock !== undefined && data.stock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        if (data.nombreProducto !== undefined && data.nombreProducto.trim().length === 0) {
            throw new Error('El nombre del producto no puede estar vacío');
        }

        if (data.descripcion !== undefined && data.descripcion.trim().length === 0) {
            throw new Error('La descripción no puede estar vacía');
        }

        if (data.categoria !== undefined && data.categoria.trim().length === 0) {
            throw new Error('La categoría no puede estar vacía');
        }

        // Limpiar strings si existen
        const updateData: UpdateProductoDto = {};
        if (data.nombreProducto !== undefined) updateData.nombreProducto = data.nombreProducto.trim();
        if (data.descripcion !== undefined) updateData.descripcion = data.descripcion.trim();
        if (data.categoria !== undefined) updateData.categoria = data.categoria.trim();
        if (data.imagenURL !== undefined) updateData.imagenURL = data.imagenURL.trim();
        if (data.precio !== undefined) updateData.precio = data.precio;
        if (data.stock !== undefined) updateData.stock = data.stock;

        return await this.productoRepository.update(id, updateData);
    }

    async deleteProducto(id: number): Promise<boolean> {
        if (id <= 0) {
            throw new Error('ID de producto inválido');
        }

        const productoExistente = await this.productoRepository.findById(id);
        if (!productoExistente) {
            throw new Error('Producto no encontrado');
        }

        return await this.productoRepository.delete(id);
    }

    async updateStock(id: number, nuevoStock: number): Promise<Producto | null> {
        if (id <= 0) {
            throw new Error('ID de producto inválido');
        }

        if (nuevoStock < 0) {
            throw new Error('El stock no puede ser negativo');
        }

        const productoExistente = await this.productoRepository.findById(id);
        if (!productoExistente) {
            throw new Error('Producto no encontrado');
        }

        return await this.productoRepository.updateStock(id, nuevoStock);
    }

    async getProductStatistics(): Promise<ProductStatistics> {
        const productos = await this.productoRepository.findAll();
        
        const total = productos.length;
        const enStock = productos.filter(p => p.stock > 0).length;
        const sinStock = productos.filter(p => p.stock === 0).length;
        const stockBajo = productos.filter(p => p.stock > 0 && p.stock <= 10).length;
        
        const promedioPrice = total > 0 
            ? productos.reduce((sum, p) => sum + p.precio, 0) / total 
            : 0;

        const categorias: { [key: string]: number } = {};
        productos.forEach(p => {
            categorias[p.categoria] = (categorias[p.categoria] || 0) + 1;
        });

        return {
            total,
            enStock,
            sinStock,
            stockBajo,
            promedioPrice: Math.round(promedioPrice * 100) / 100,
            categorias
        };
    }

    async getProductosByStockLevel(nivel: 'bajo' | 'medio' | 'alto'): Promise<Producto[]> {
        return await this.productoRepository.getProductsByStockLevel(nivel);
    }

    async reduceStock(id: number, cantidad: number): Promise<Producto | null> {
        if (cantidad <= 0) {
            throw new Error('La cantidad a reducir debe ser mayor a 0');
        }

        const producto = await this.productoRepository.findById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        if (producto.stock < cantidad) {
            throw new Error(`Stock insuficiente. Stock actual: ${producto.stock}`);
        }

        const nuevoStock = producto.stock - cantidad;
        return await this.productoRepository.updateStock(id, nuevoStock);
    }

    async increaseStock(id: number, cantidad: number): Promise<Producto | null> {
        if (cantidad <= 0) {
            throw new Error('La cantidad a aumentar debe ser mayor a 0');
        }

        const producto = await this.productoRepository.findById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        const nuevoStock = producto.stock + cantidad;
        return await this.productoRepository.updateStock(id, nuevoStock);
    }
}