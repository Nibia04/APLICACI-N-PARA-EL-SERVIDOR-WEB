import { PartialType } from '@nestjs/mapped-types';
import { CreateTarjetaVirtualDto } from './create-tarjeta-virtual.dto';

export class UpdateTarjetaVirtualDto extends PartialType(CreateTarjetaVirtualDto) {}
