import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TrajetasVirtualesService } from './trajetas-virtuales.service';
import { TarjetaVirtual } from './entities/trajetas-virtuale.entity';
import { CreateTrajetasVirtualeInput } from './dto/create-trajetas-virtuale.input';
import { UpdateTrajetasVirtualeInput } from './dto/update-trajetas-virtuale.input';

@Resolver(() => TarjetaVirtual)
export class TrajetasVirtualesResolver {
  constructor(private readonly trajetasVirtualesService: TrajetasVirtualesService) {}

  @Mutation(() => TarjetaVirtual)
  createTrajetasVirtuale(@Args('createTrajetasVirtualeInput') createTrajetasVirtualeInput: CreateTrajetasVirtualeInput) {
    return this.trajetasVirtualesService.create(createTrajetasVirtualeInput);
  }

  @Query(() => [TarjetaVirtual], { name: 'trajetasVirtuales' })
  findAll() {
    return this.trajetasVirtualesService.findAll();
  }

  @Query(() => TarjetaVirtual, { name: 'trajetasVirtuale' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.trajetasVirtualesService.findOne(id);
  }

  @Mutation(() => TarjetaVirtual)
  updateTrajetasVirtuale(@Args('updateTrajetasVirtualeInput') updateTrajetasVirtualeInput: UpdateTrajetasVirtualeInput) {
    return this.trajetasVirtualesService.update(updateTrajetasVirtualeInput.id, updateTrajetasVirtualeInput);
  }

  @Mutation(() => TarjetaVirtual)
  removeTrajetasVirtuale(@Args('id', { type: () => Int }) id: number) {
    return this.trajetasVirtualesService.remove(id);
  }
}
