import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsuariosService } from './usuarios.service';
import { UsuariosResolver } from './usuarios.resolver';

@Module({
  imports: [HttpModule],
  providers: [UsuariosResolver, UsuariosService],
})
export class UsuariosModule {}
