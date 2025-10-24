import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateCarritoDeCompraInput } from './dto/create-carrito-de-compra.input';
import { UpdateCarritoDeCompraInput } from './dto/update-carrito-de-compra.input';
import { CarritoDeCompra } from './entities/carrito-de-compra.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class CarritoDeComprasService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/carritos-compra`;

  constructor(private readonly httpService: HttpService) {}

  async create(createCarritoDeCompraInput: CreateCarritoDeCompraInput): Promise<CarritoDeCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createCarritoDeCompraInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear carrito de compras',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<CarritoDeCompra[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener carritos de compras',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<CarritoDeCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener carrito de compras #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateCarritoDeCompraInput: UpdateCarritoDeCompraInput): Promise<CarritoDeCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateCarritoDeCompraInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar carrito de compras #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<CarritoDeCompra> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar carrito de compras #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
