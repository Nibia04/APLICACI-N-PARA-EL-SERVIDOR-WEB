import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PagosService } from './pagos.service';
import { PagosResolver } from './pagos.resolver';

@Module({
  imports: [HttpModule],
  providers: [PagosResolver, PagosService],
})
export class PagosModule {}
