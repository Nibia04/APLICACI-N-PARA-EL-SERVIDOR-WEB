import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarjetasVirtualesService } from './tarjetas-virtuales.service';
import { TarjetasVirtualesController } from './tarjetas-virtuales.controller';
import { TarjetaVirtual } from './entities/tarjeta-virtual.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TarjetaVirtual])],
  controllers: [TarjetasVirtualesController],
  providers: [TarjetasVirtualesService],
  exports: [TarjetasVirtualesService],
})
export class TarjetasVirtualesModule {}
