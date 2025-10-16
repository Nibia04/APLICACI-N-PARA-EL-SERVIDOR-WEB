import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialCompraDto } from './create-historial-compra.dto';

export class UpdateHistorialCompraDto extends PartialType(CreateHistorialCompraDto) {}
