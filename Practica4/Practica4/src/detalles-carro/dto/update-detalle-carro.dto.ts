import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleCarroDto } from './create-detalle-carro.dto';

export class UpdateDetalleCarroDto extends PartialType(CreateDetalleCarroDto) {}
