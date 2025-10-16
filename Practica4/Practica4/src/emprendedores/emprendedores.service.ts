import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmprendedorDto } from './dto/create-emprendedore.dto';
import { UpdateEmprendedorDto } from './dto/update-emprendedore.dto';
import { Emprendedor } from './entities/emprendedore.entity';

@Injectable()
export class EmprendedoresService {
  constructor(
    @InjectRepository(Emprendedor)
    private readonly emprendedorRepository: Repository<Emprendedor>,
  ) {}

  /**
   * Crear un nuevo emprendedor
   */
  async create(createEmprendedorDto: CreateEmprendedorDto): Promise<Emprendedor> {
    const emprendedor = this.emprendedorRepository.create(createEmprendedorDto);
    return await this.emprendedorRepository.save(emprendedor);
  }

  /**
   * Obtener todos los emprendedores
   */
  async findAll(): Promise<Emprendedor[]> {
    return await this.emprendedorRepository.find({
      relations: ['usuario'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  /**
   * Obtener un emprendedor por ID
   */
  async findOne(id: number): Promise<Emprendedor> {
    const emprendedor = await this.emprendedorRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!emprendedor) {
      throw new NotFoundException(`Emprendedor con ID ${id} no encontrado`);
    }

    return emprendedor;
  }

  /**
   * Actualizar un emprendedor
   */
  async update(id: number, updateEmprendedorDto: UpdateEmprendedorDto): Promise<Emprendedor> {
    const emprendedor = await this.findOne(id);
    Object.assign(emprendedor, updateEmprendedorDto);
    return await this.emprendedorRepository.save(emprendedor);
  }

  /**
   * Eliminar un emprendedor
   */
  async remove(id: number): Promise<{ message: string }> {
    const emprendedor = await this.findOne(id);
    await this.emprendedorRepository.remove(emprendedor);
    return { message: `Emprendedor con ID ${id} eliminado exitosamente` };
  }
}

