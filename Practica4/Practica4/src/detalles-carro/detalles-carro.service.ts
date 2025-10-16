import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleCarro } from './entities/detalle-carro.entity';
import { CreateDetalleCarroDto } from './dto/create-detalle-carro.dto';
import { UpdateDetalleCarroDto } from './dto/update-detalle-carro.dto';

@Injectable()
export class DetallesCarroService {
  constructor(
    @InjectRepository(DetalleCarro)
    private readonly detalleCarroRepository: Repository<DetalleCarro>,
  ) {}

  async create(createDetalleCarroDto: CreateDetalleCarroDto): Promise<DetalleCarro> {
    const detalleCarro = this.detalleCarroRepository.create(createDetalleCarroDto);
    return await this.detalleCarroRepository.save(detalleCarro);
  }

  async findAll(): Promise<DetalleCarro[]> {
    return await this.detalleCarroRepository.find({
      relations: ['carrito', 'producto'],
      order: { fechaAgregado: 'DESC' },
    });
  }

  async findOne(id: number): Promise<DetalleCarro> {
    const detalleCarro = await this.detalleCarroRepository.findOne({
      where: { id },
      relations: ['carrito', 'producto'],
    });

    if (!detalleCarro) {
      throw new NotFoundException(`Detalle de carro con ID ${id} no encontrado`);
    }

    return detalleCarro;
  }

  async update(id: number, updateDetalleCarroDto: UpdateDetalleCarroDto): Promise<DetalleCarro> {
    const detalleCarro = await this.findOne(id);
    Object.assign(detalleCarro, updateDetalleCarroDto);
    return await this.detalleCarroRepository.save(detalleCarro);
  }

  async remove(id: number): Promise<{ message: string }> {
    const detalleCarro = await this.findOne(id);
    await this.detalleCarroRepository.remove(detalleCarro);
    return { message: `Detalle de carro con ID ${id} eliminado exitosamente` };
  }
}
