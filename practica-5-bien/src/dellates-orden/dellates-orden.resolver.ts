import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DellatesOrdenService } from './dellates-orden.service';
import { DetalleOrden } from './entities/dellates-orden.entity';
import { CreateDellatesOrdenInput } from './dto/create-dellates-orden.input';
import { UpdateDellatesOrdenInput } from './dto/update-dellates-orden.input';

@Resolver(() => DetalleOrden)
export class DellatesOrdenResolver {
  constructor(private readonly dellatesOrdenService: DellatesOrdenService) {}

  @Mutation(() => DetalleOrden)
  createDellatesOrden(@Args('createDellatesOrdenInput') createDellatesOrdenInput: CreateDellatesOrdenInput) {
    return this.dellatesOrdenService.create(createDellatesOrdenInput);
  }

  @Query(() => [DetalleOrden], { name: 'dellatesOrden' })
  findAll() {
    return this.dellatesOrdenService.findAll();
  }

  @Query(() => DetalleOrden, { name: 'dellatesOrden' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dellatesOrdenService.findOne(id);
  }

  @Mutation(() => DetalleOrden)
  updateDellatesOrden(@Args('updateDellatesOrdenInput') updateDellatesOrdenInput: UpdateDellatesOrdenInput) {
    return this.dellatesOrdenService.update(updateDellatesOrdenInput.id, updateDellatesOrdenInput);
  }

  @Mutation(() => DetalleOrden)
  removeDellatesOrden(@Args('id', { type: () => Int }) id: number) {
    return this.dellatesOrdenService.remove(id);
  }
}
