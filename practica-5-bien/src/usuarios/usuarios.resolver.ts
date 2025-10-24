import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Mutation(() => Usuario, { description: 'Crear un nuevo usuario en el sistema' })
  createUsuario(@Args('createUsuarioInput') createUsuarioInput: CreateUsuarioInput) {
    return this.usuariosService.create(createUsuarioInput);
  }

  @Query(() => [Usuario], { 
    name: 'usuarios',
    description: 'Obtener lista de todos los usuarios registrados'
  })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Query(() => Usuario, { 
    name: 'usuario',
    description: 'Buscar un usuario específico por su ID'
  })
  findOne(@Args('id', { type: () => Int, description: 'ID del usuario' }) id: number) {
    return this.usuariosService.findOne(id);
  }

  @Mutation(() => Usuario, { description: 'Actualizar información de un usuario' })
  updateUsuario(@Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput) {
    return this.usuariosService.update(updateUsuarioInput.id, updateUsuarioInput);
  }

  @Mutation(() => Usuario, { description: 'Eliminar un usuario del sistema' })
  removeUsuario(@Args('id', { type: () => Int, description: 'ID del usuario a eliminar' }) id: number) {
    return this.usuariosService.remove(id);
  }
}
