import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmprendedoresService } from './emprendedores.service';
import { Emprendedor } from './entities/emprendedore.entity';
import { CreateEmprendedoreInput } from './dto/create-emprendedore.input';
import { UpdateEmprendedoreInput } from './dto/update-emprendedore.input';

@Resolver(() => Emprendedor)
export class EmprendedoresResolver {
  constructor(private readonly emprendedoresService: EmprendedoresService) {}

  @Mutation(() => Emprendedor)
  createEmprendedore(@Args('createEmprendedoreInput') createEmprendedoreInput: CreateEmprendedoreInput) {
    return this.emprendedoresService.create(createEmprendedoreInput);
  }

  @Query(() => [Emprendedor], { name: 'emprendedores' })
  findAll() {
    return this.emprendedoresService.findAll();
  }

  @Query(() => Emprendedor, { name: 'emprendedore' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.emprendedoresService.findOne(id);
  }

  @Mutation(() => Emprendedor)
  updateEmprendedore(@Args('updateEmprendedoreInput') updateEmprendedoreInput: UpdateEmprendedoreInput) {
    return this.emprendedoresService.update(updateEmprendedoreInput.id, updateEmprendedoreInput);
  }

  @Mutation(() => Emprendedor)
  removeEmprendedore(@Args('id', { type: () => Int }) id: number) {
    return this.emprendedoresService.remove(id);
  }
}
