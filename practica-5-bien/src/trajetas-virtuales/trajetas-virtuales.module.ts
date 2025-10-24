import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TrajetasVirtualesService } from './trajetas-virtuales.service';
import { TrajetasVirtualesResolver } from './trajetas-virtuales.resolver';

@Module({
  imports: [HttpModule],
  providers: [TrajetasVirtualesResolver, TrajetasVirtualesService],
})
export class TrajetasVirtualesModule {}
