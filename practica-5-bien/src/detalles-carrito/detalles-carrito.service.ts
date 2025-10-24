import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateDetallesCarritoInput } from './dto/create-detalles-carrito.input';
import { UpdateDetallesCarritoInput } from './dto/update-detalles-carrito.input';
import { DetallesCarrito } from './entities/detalles-carrito.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class DetallesCarritoService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/detalles-carro`;

  constructor(private readonly httpService: HttpService) {}

  async create(createDetallesCarritoInput: CreateDetallesCarritoInput): Promise<DetallesCarrito> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createDetallesCarritoInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear detalle de carrito',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<DetallesCarrito[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener detalles de carrito',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<DetallesCarrito> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener detalle de carrito #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateDetallesCarritoInput: UpdateDetallesCarritoInput): Promise<DetallesCarrito> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateDetallesCarritoInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar detalle de carrito #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<DetallesCarrito> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar detalle de carrito #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
