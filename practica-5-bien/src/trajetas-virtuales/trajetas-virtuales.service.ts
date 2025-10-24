import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateTrajetasVirtualeInput } from './dto/create-trajetas-virtuale.input';
import { UpdateTrajetasVirtualeInput } from './dto/update-trajetas-virtuale.input';
import { TarjetaVirtual } from './entities/trajetas-virtuale.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class TrajetasVirtualesService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/tarjetas-virtuales`;

  constructor(private readonly httpService: HttpService) {}

  async create(createTrajetasVirtualeInput: CreateTrajetasVirtualeInput): Promise<TarjetaVirtual> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createTrajetasVirtualeInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear tarjeta virtual',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<TarjetaVirtual[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener tarjetas virtuales',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<TarjetaVirtual> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener tarjeta virtual #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateTrajetasVirtualeInput: UpdateTrajetasVirtualeInput): Promise<TarjetaVirtual> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateTrajetasVirtualeInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar tarjeta virtual #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<TarjetaVirtual> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar tarjeta virtual #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
