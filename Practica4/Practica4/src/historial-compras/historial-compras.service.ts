import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialCompra } from './entities/historial-compra.entity';
import { CreateHistorialCompraDto } from './dto/create-historial-compra.dto';
import { UpdateHistorialCompraDto } from './dto/update-historial-compra.dto';

@Injectable()
export class HistorialComprasService {
  constructor(
    @InjectRepository(HistorialCompra)
    private readonly historialCompraRepository: Repository<HistorialCompra>,
  ) {}

  async create(createHistorialCompraDto: CreateHistorialCompraDto): Promise<HistorialCompra> {
    const historialCompra = this.historialCompraRepository.create(createHistorialCompraDto);
    return await this.historialCompraRepository.save(historialCompra);
  }

  async findAll(): Promise<HistorialCompra[]> {
    return await this.historialCompraRepository.find({
      relations: ['cliente', 'orden'],
      order: { fechaCompra: 'DESC' },
    });
  }

  async findOne(id: number): Promise<HistorialCompra> {
    const historialCompra = await this.historialCompraRepository.findOne({
      where: { id },
      relations: ['cliente', 'orden'],
    });

    if (!historialCompra) {
      throw new NotFoundException(`Historial de compra con ID ${id} no encontrado`);
    }

    return historialCompra;
  }

  async update(id: number, updateHistorialCompraDto: UpdateHistorialCompraDto): Promise<HistorialCompra> {
    const historialCompra = await this.findOne(id);
    Object.assign(historialCompra, updateHistorialCompraDto);
    return await this.historialCompraRepository.save(historialCompra);
  }

  async remove(id: number): Promise<{ message: string }> {
    const historialCompra = await this.findOne(id);
    await this.historialCompraRepository.remove(historialCompra);
    return { message: `Historial de compra con ID ${id} eliminado exitosamente` };
  }
}
