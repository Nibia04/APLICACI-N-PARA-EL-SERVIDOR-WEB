import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const pago = this.pagoRepository.create(createPagoDto);
    return await this.pagoRepository.save(pago);
  }

  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find({
      relations: ['orden', 'tarjeta'],
      order: { fechaPago: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: ['orden', 'tarjeta'],
    });

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);
    Object.assign(pago, updatePagoDto);
    return await this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<{ message: string }> {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
    return { message: `Pago con ID ${id} eliminado exitosamente` };
  }
}
