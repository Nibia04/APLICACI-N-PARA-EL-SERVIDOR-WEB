import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateOrdeneInput } from './dto/create-ordene.input';
import { UpdateOrdeneInput } from './dto/update-ordene.input';
import { Orden } from './entities/ordene.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class OrdenesService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/ordenes`;

  constructor(private readonly httpService: HttpService) {}

  async create(createOrdeneInput: CreateOrdeneInput): Promise<Orden> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createOrdeneInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear orden',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Orden[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener ordenes',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<Orden> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener orden #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateOrdeneInput: UpdateOrdeneInput): Promise<Orden> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateOrdeneInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar orden #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<Orden> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar orden #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
