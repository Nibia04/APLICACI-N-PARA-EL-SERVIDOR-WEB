import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarritoCompra } from './entities/carrito-compra.entity';
import { CreateCarritoCompraDto } from './dto/create-carrito-compra.dto';
import { UpdateCarritoCompraDto } from './dto/update-carrito-compra.dto';

@Injectable()
export class CarritosCompraService {
  constructor(
    @InjectRepository(CarritoCompra)
    private readonly carritoCompraRepository: Repository<CarritoCompra>,
  ) {}

  async create(createCarritoCompraDto: CreateCarritoCompraDto): Promise<CarritoCompra> {
    const carritoCompra = this.carritoCompraRepository.create(createCarritoCompraDto);
    return await this.carritoCompraRepository.save(carritoCompra);
  }

  async findAll(): Promise<CarritoCompra[]> {
    return await this.carritoCompraRepository.find({
      relations: ['cliente'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CarritoCompra> {
    const carritoCompra = await this.carritoCompraRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!carritoCompra) {
      throw new NotFoundException(`Carrito de compra con ID ${id} no encontrado`);
    }

    return carritoCompra;
  }

  async update(id: number, updateCarritoCompraDto: UpdateCarritoCompraDto): Promise<CarritoCompra> {
    const carritoCompra = await this.findOne(id);
    Object.assign(carritoCompra, updateCarritoCompraDto);
    return await this.carritoCompraRepository.save(carritoCompra);
  }

  async remove(id: number): Promise<{ message: string }> {
    const carritoCompra = await this.findOne(id);
    await this.carritoCompraRepository.remove(carritoCompra);
    return { message: `Carrito de compra con ID ${id} eliminado exitosamente` };
  }
}
