import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleOrdenDto } from './create-detalle-orden.dto';

export class UpdateDetalleOrdenDto extends PartialType(CreateDetalleOrdenDto) {}
