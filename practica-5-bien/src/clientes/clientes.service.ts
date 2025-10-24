import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateClienteInput } from './dto/create-cliente.input';
import { UpdateClienteInput } from './dto/update-cliente.input';
import { Cliente } from './entities/cliente.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class ClientesService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/clientes`;

  constructor(private readonly httpService: HttpService) {}

  async create(createClienteInput: CreateClienteInput): Promise<Cliente> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createClienteInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear cliente',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener clientes',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<Cliente> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener cliente #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateClienteInput: UpdateClienteInput): Promise<Cliente> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateClienteInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar cliente #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<Cliente> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar cliente #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
