import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateEmprendedoreInput } from './dto/create-emprendedore.input';
import { UpdateEmprendedoreInput } from './dto/update-emprendedore.input';
import { Emprendedor } from './entities/emprendedore.entity';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class EmprendedoresService {
  private readonly API_URL = `${API_CONFIG.BASE_URL}/emprendedores`;

  constructor(private readonly httpService: HttpService) {}

  async create(createEmprendedoreInput: CreateEmprendedoreInput): Promise<Emprendedor> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(this.API_URL, createEmprendedoreInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al crear emprendedor',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findAll(): Promise<Emprendedor[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.API_URL)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Error al obtener emprendedores',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number): Promise<Emprendedor> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al obtener emprendedor #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, updateEmprendedoreInput: UpdateEmprendedoreInput): Promise<Emprendedor> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`${this.API_URL}/${id}`, updateEmprendedoreInput)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al actualizar emprendedor #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number): Promise<Emprendedor> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.API_URL}/${id}`)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || `Error al eliminar emprendedor #${id}`,
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
