import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TarjetaVirtual } from './entities/tarjeta-virtual.entity';
import { CreateTarjetaVirtualDto } from './dto/create-tarjeta-virtual.dto';
import { UpdateTarjetaVirtualDto } from './dto/update-tarjeta-virtual.dto';

@Injectable()
export class TarjetasVirtualesService {
  constructor(
    @InjectRepository(TarjetaVirtual)
    private readonly tarjetaVirtualRepository: Repository<TarjetaVirtual>,
  ) {}

  /**
   * Crear una nueva tarjeta virtual
   */
  async create(createTarjetaVirtualDto: CreateTarjetaVirtualDto): Promise<TarjetaVirtual> {
    // Verificar si el número de tarjeta ya existe
    const existeNumero = await this.tarjetaVirtualRepository.findOne({
      where: { numeroTarjeta: createTarjetaVirtualDto.numeroTarjeta },
    });

    if (existeNumero) {
      throw new ConflictException('El número de tarjeta ya está registrado');
    }

    const tarjetaVirtual = this.tarjetaVirtualRepository.create(createTarjetaVirtualDto);
    return await this.tarjetaVirtualRepository.save(tarjetaVirtual);
  }

  /**
   * Obtener todas las tarjetas virtuales
   */
  async findAll(): Promise<TarjetaVirtual[]> {
    return await this.tarjetaVirtualRepository.find({
      relations: ['cliente'],
      order: { fechaCreacion: 'DESC' },
    });
  }

  /**
   * Obtener una tarjeta virtual por ID
   */
  async findOne(id: number): Promise<TarjetaVirtual> {
    const tarjetaVirtual = await this.tarjetaVirtualRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

    if (!tarjetaVirtual) {
      throw new NotFoundException(`Tarjeta virtual con ID ${id} no encontrada`);
    }

    return tarjetaVirtual;
  }

  /**
   * Actualizar una tarjeta virtual
   */
  async update(id: number, updateTarjetaVirtualDto: UpdateTarjetaVirtualDto): Promise<TarjetaVirtual> {
    const tarjetaVirtual = await this.findOne(id);

    // Si se está actualizando el número de tarjeta, verificar que no exista
    if (updateTarjetaVirtualDto.numeroTarjeta && updateTarjetaVirtualDto.numeroTarjeta !== tarjetaVirtual.numeroTarjeta) {
      const existeNumero = await this.tarjetaVirtualRepository.findOne({
        where: { numeroTarjeta: updateTarjetaVirtualDto.numeroTarjeta },
      });

      if (existeNumero) {
        throw new ConflictException('El número de tarjeta ya está registrado');
      }
    }

    Object.assign(tarjetaVirtual, updateTarjetaVirtualDto);
    return await this.tarjetaVirtualRepository.save(tarjetaVirtual);
  }

  /**
   * Eliminar una tarjeta virtual
   */
  async remove(id: number): Promise<{ message: string }> {
    const tarjetaVirtual = await this.findOne(id);
    await this.tarjetaVirtualRepository.remove(tarjetaVirtual);
    return { message: `Tarjeta virtual con ID ${id} eliminada exitosamente` };
  }
}
