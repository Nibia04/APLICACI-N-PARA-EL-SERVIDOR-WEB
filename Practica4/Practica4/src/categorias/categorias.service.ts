import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  /**
   * Crear una nueva categoría
   */
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    // Verificar si el nombre ya existe
    const existeNombre = await this.categoriaRepository.findOne({
      where: { nombre: createCategoriaDto.nombre },
    });

    if (existeNombre) {
      throw new ConflictException('Ya existe una categoría con ese nombre');
    }

    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  /**
   * Obtener todas las categorías
   */
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      order: { nombre: 'ASC' },
    });
  }

  /**
   * Obtener una categoría por ID
   */
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  /**
   * Actualizar una categoría
   */
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.findOne(id);

    // Si se está actualizando el nombre, verificar que no exista
    if (updateCategoriaDto.nombre && updateCategoriaDto.nombre !== categoria.nombre) {
      const existeNombre = await this.categoriaRepository.findOne({
        where: { nombre: updateCategoriaDto.nombre },
      });

      if (existeNombre) {
        throw new ConflictException('Ya existe una categoría con ese nombre');
      }
    }

    Object.assign(categoria, updateCategoriaDto);
    return await this.categoriaRepository.save(categoria);
  }

  /**
   * Eliminar una categoría
   */
  async remove(id: number): Promise<{ message: string }> {
    const categoria = await this.findOne(id);
    await this.categoriaRepository.remove(categoria);
    return { message: `Categoría con ID ${id} eliminada exitosamente` };
  }
}
