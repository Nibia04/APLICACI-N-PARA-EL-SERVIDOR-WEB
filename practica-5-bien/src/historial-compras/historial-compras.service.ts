import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateHistorialCompraInput } from './dto/create-historial-compra.input';
import { UpdateHistorialCompraInput } from './dto/update-historial-compra.input';
import { HistorialCompra } from './entities/historial-compra.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class HistorialComprasService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/historial-compras`;

  constructor(private readonly httpService: HttpService) {}

  async create(createHistorialCompraInput: CreateHistorialCompraInput): Promise<HistorialCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createHistorialCompraInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear historial de compra',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<HistorialCompra[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener historial de compras',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<HistorialCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener historial de compra #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateHistorialCompraInput: UpdateHistorialCompraInput): Promise<HistorialCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateHistorialCompraInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar historial de compra #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<HistorialCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar historial de compra #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
