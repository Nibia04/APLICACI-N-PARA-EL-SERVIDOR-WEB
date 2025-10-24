import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DetallesCarritoService } from './detalles-carrito.service';
import { DetallesCarrito } from './entities/detalles-carrito.entity';
import { CreateDetallesCarritoInput } from './dto/create-detalles-carrito.input';
import { UpdateDetallesCarritoInput } from './dto/update-detalles-carrito.input';

@Resolver(() => DetallesCarrito)
export class DetallesCarritoResolver {
  constructor(private readonly detallesCarritoService: DetallesCarritoService) {}

  @Mutation(() => DetallesCarrito)
  createDetallesCarrito(@Args('createDetallesCarritoInput') createDetallesCarritoInput: CreateDetallesCarritoInput) {
    return this.detallesCarritoService.create(createDetallesCarritoInput);
  }

  @Query(() => [DetallesCarrito], { name: 'detallesCarrito' })
  findAll() {
    return this.detallesCarritoService.findAll();
  }

  @Query(() => DetallesCarrito, { name: 'detallesCarrito' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.detallesCarritoService.findOne(id);
  }

  @Mutation(() => DetallesCarrito)
  updateDetallesCarrito(@Args('updateDetallesCarritoInput') updateDetallesCarritoInput: UpdateDetallesCarritoInput) {
    return this.detallesCarritoService.update(updateDetallesCarritoInput.id, updateDetallesCarritoInput);
  }

  @Mutation(() => DetallesCarrito)
  removeDetallesCarrito(@Args('id', { type: () => Int }) id: number) {
    return this.detallesCarritoService.remove(id);
  }
}
