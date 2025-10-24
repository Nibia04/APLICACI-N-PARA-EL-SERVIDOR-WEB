import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OrdenesService } from './ordenes.service';
import { OrdenesResolver } from './ordenes.resolver';

@Module({
  imports: [HttpModule],
  providers: [OrdenesResolver, OrdenesService],
})
export class OrdenesModule {}
