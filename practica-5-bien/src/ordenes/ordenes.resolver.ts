import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdenesService } from './ordenes.service';
import { Orden } from './entities/ordene.entity';
import { CreateOrdeneInput } from './dto/create-ordene.input';
import { UpdateOrdeneInput } from './dto/update-ordene.input';

@Resolver(() => Orden)
export class OrdenesResolver {
  constructor(private readonly ordenesService: OrdenesService) {}

  @Mutation(() => Orden)
  createOrdene(@Args('createOrdeneInput') createOrdeneInput: CreateOrdeneInput) {
    return this.ordenesService.create(createOrdeneInput);
  }

  @Query(() => [Orden], { name: 'ordenes' })
  findAll() {
    return this.ordenesService.findAll();
  }

  @Query(() => Orden, { name: 'ordene' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordenesService.findOne(id);
  }

  @Mutation(() => Orden)
  updateOrdene(@Args('updateOrdeneInput') updateOrdeneInput: UpdateOrdeneInput) {
    return this.ordenesService.update(updateOrdeneInput.id, updateOrdeneInput);
  }

  @Mutation(() => Orden)
  removeOrdene(@Args('id', { type: () => Int }) id: number) {
    return this.ordenesService.remove(id);
  }
}
