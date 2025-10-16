import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprendedoresService } from './emprendedores.service';
import { EmprendedoresController } from './emprendedores.controller';
import { Emprendedor } from './entities/emprendedore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emprendedor])],
  controllers: [EmprendedoresController],
  providers: [EmprendedoresService],
  exports: [EmprendedoresService],
})
export class EmprendedoresModule {}

