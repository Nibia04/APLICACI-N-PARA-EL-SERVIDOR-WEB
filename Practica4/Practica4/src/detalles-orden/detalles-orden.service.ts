import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleOrden } from './entities/detalle-orden.entity';
import { CreateDetalleOrdenDto } from './dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from './dto/update-detalle-orden.dto';

@Injectable()
export class DetallesOrdenService {
  constructor(
    @InjectRepository(DetalleOrden)
    private readonly detalleOrdenRepository: Repository<DetalleOrden>,
  ) {}

  async create(createDetalleOrdenDto: CreateDetalleOrdenDto): Promise<DetalleOrden> {
    const detalleOrden = this.detalleOrdenRepository.create(createDetalleOrdenDto);
    return await this.detalleOrdenRepository.save(detalleOrden);
  }

  async findAll(): Promise<DetalleOrden[]> {
    return await this.detalleOrdenRepository.find({
      relations: ['orden', 'producto'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<DetalleOrden> {
    const detalleOrden = await this.detalleOrdenRepository.findOne({
      where: { id },
      relations: ['orden', 'producto'],
    });

    if (!detalleOrden) {
      throw new NotFoundException(`Detalle de orden con ID ${id} no encontrado`);
    }

    return detalleOrden;
  }

  async update(id: number, updateDetalleOrdenDto: UpdateDetalleOrdenDto): Promise<DetalleOrden> {
    const detalleOrden = await this.findOne(id);
    Object.assign(detalleOrden, updateDetalleOrdenDto);
    return await this.detalleOrdenRepository.save(detalleOrden);
  }

  async remove(id: number): Promise<{ message: string }> {
    const detalleOrden = await this.findOne(id);
    await this.detalleOrdenRepository.remove(detalleOrden);
    return { message: `Detalle de orden con ID ${id} eliminado exitosamente` };
  }
}
