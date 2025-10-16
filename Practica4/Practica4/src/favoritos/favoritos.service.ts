import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorito } from './entities/favorito.entity';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private readonly favoritoRepository: Repository<Favorito>,
  ) {}

  async create(createFavoritoDto: CreateFavoritoDto): Promise<Favorito> {
    const favorito = this.favoritoRepository.create(createFavoritoDto);
    return await this.favoritoRepository.save(favorito);
  }

  async findAll(): Promise<Favorito[]> {
    return await this.favoritoRepository.find({
      relations: ['cliente', 'producto'],
      order: { fechaAgregado: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Favorito> {
    const favorito = await this.favoritoRepository.findOne({
      where: { id },
      relations: ['cliente', 'producto'],
    });

    if (!favorito) {
      throw new NotFoundException(`Favorito con ID ${id} no encontrado`);
    }

    return favorito;
  }

  async update(id: number, updateFavoritoDto: UpdateFavoritoDto): Promise<Favorito> {
    const favorito = await this.findOne(id);
    Object.assign(favorito, updateFavoritoDto);
    return await this.favoritoRepository.save(favorito);
  }

  async remove(id: number): Promise<{ message: string }> {
    const favorito = await this.findOne(id);
    await this.favoritoRepository.remove(favorito);
    return { message: `Favorito con ID ${id} eliminado exitosamente` };
  }
}
