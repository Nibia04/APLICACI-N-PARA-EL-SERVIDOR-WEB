import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateDellatesOrdenInput } from './dto/create-dellates-orden.input';
import { UpdateDellatesOrdenInput } from './dto/update-dellates-orden.input';
import { DetalleOrden } from './entities/dellates-orden.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class DellatesOrdenService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/detalles-orden`;

  constructor(private readonly httpService: HttpService) {}

  async create(createDellatesOrdenInput: CreateDellatesOrdenInput): Promise<DetalleOrden> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createDellatesOrdenInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear detalle de orden',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<DetalleOrden[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener detalles de orden',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<DetalleOrden> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener detalle de orden #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateDellatesOrdenInput: UpdateDellatesOrdenInput): Promise<DetalleOrden> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateDellatesOrdenInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar detalle de orden #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<DetalleOrden> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar detalle de orden #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
