import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  /**
   * Crear un nuevo usuario
   */
  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Verificar si el email ya existe
    const existeEmail = await this.usuarioRepository.findOne({
      where: { email: createUsuarioDto.email },
    });

    if (existeEmail) {
      throw new ConflictException('El email ya está registrado');
    }

    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  /**
   * Obtener todos los usuarios
   */
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      order: { fechaCreacion: 'DESC' },
    });
  }

  /**
   * Obtener un usuario por ID
   */
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  /**
   * Actualizar un usuario
   */
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);

    // Si se está actualizando el email, verificar que no exista
    if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
      const existeEmail = await this.usuarioRepository.findOne({
        where: { email: updateUsuarioDto.email },
      });

      if (existeEmail) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    Object.assign(usuario, updateUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  /**
   * Eliminar un usuario
   */
  async remove(id: number): Promise<{ message: string }> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return { message: `Usuario con ID ${id} eliminado exitosamente` };
  }
}
