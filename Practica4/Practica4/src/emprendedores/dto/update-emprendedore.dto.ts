import { PartialType } from '@nestjs/mapped-types';
import { CreateEmprendedorDto } from './create-emprendedore.dto';

export class UpdateEmprendedorDto extends PartialType(CreateEmprendedorDto) {}

