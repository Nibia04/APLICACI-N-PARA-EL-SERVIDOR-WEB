import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EmprendedoresService } from './emprendedores.service';
import { EmprendedoresResolver } from './emprendedores.resolver';

@Module({
  imports: [HttpModule],
  providers: [EmprendedoresResolver, EmprendedoresService],
})
export class EmprendedoresModule {}
