import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DellatesOrdenService } from './dellates-orden.service';
import { DellatesOrdenResolver } from './dellates-orden.resolver';

@Module({
  imports: [HttpModule],
  providers: [DellatesOrdenResolver, DellatesOrdenService],
})
export class DellatesOrdenModule {}
