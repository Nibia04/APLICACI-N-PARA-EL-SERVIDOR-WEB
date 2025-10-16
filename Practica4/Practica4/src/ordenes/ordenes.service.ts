import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
  ) {}

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    const existeNumero = await this.ordenRepository.findOne({
      where: { numeroOrden: createOrdenDto.numeroOrden },
    });

    if (existeNumero) {
      throw new ConflictException('El número de orden ya existe');
    }

    const orden = this.ordenRepository.create(createOrdenDto);
    return await this.ordenRepository.save(orden);
  }

  async findAll(): Promise<Orden[]> {
    return await this.ordenRepository.find({
      relations: ['cliente'],
      order: { fechaOrden: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Orden> {
    const orden = await this.ordenRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return orden;
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    const orden = await this.findOne(id);
    Object.assign(orden, updateOrdenDto);
    return await this.ordenRepository.save(orden);
  }

  async remove(id: number): Promise<{ message: string }> {
    const orden = await this.findOne(id);
    await this.ordenRepository.remove(orden);
    return { message: `Orden con ID ${id} eliminada exitosamente` };
  }
}
