import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ClientesService } from './clientes.service';
import { ClientesResolver } from './clientes.resolver';

@Module({
  imports: [HttpModule],
  providers: [ClientesResolver, ClientesService],
})
export class ClientesModule {}
