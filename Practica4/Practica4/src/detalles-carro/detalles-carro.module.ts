import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesCarroService } from './detalles-carro.service';
import { DetallesCarroController } from './detalles-carro.controller';
import { DetalleCarro } from './entities/detalle-carro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleCarro])],
  controllers: [DetallesCarroController],
  providers: [DetallesCarroService],
  exports: [DetallesCarroService],
})
export class DetallesCarroModule {}
