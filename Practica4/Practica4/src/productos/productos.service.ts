import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  /**
   * Crear un nuevo producto
   */
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const producto = this.productoRepository.create(createProductoDto);
    return await this.productoRepository.save(producto);
  }

  /**
   * Obtener todos los productos
   */
  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['categoria', 'emprendedor'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  /**
   * Obtener un producto por ID
   */
  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria', 'emprendedor'],
    });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return producto;
  }

  /**
   * Actualizar un producto
   */
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    Object.assign(producto, updateProductoDto);
    return await this.productoRepository.save(producto);
  }

  /**
   * Eliminar un producto
   */
  async remove(id: number): Promise<{ message: string }> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
    return { message: `Producto con ID ${id} eliminado exitosamente` };
  }
}
