import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CarritoDeComprasService } from './carrito-de-compras.service';
import { CarritoDeCompra } from './entities/carrito-de-compra.entity';
import { CreateCarritoDeCompraInput } from './dto/create-carrito-de-compra.input';
import { UpdateCarritoDeCompraInput } from './dto/update-carrito-de-compra.input';

@Resolver(() => CarritoDeCompra)
export class CarritoDeComprasResolver {
  constructor(private readonly carritoDeComprasService: CarritoDeComprasService) {}

  @Mutation(() => CarritoDeCompra)
  createCarritoDeCompra(@Args('createCarritoDeCompraInput') createCarritoDeCompraInput: CreateCarritoDeCompraInput) {
    return this.carritoDeComprasService.create(createCarritoDeCompraInput);
  }

  @Query(() => [CarritoDeCompra], { name: 'carritoDeCompras' })
  findAll() {
    return this.carritoDeComprasService.findAll();
  }

  @Query(() => CarritoDeCompra, { name: 'carritoDeCompra' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.carritoDeComprasService.findOne(id);
  }

  @Mutation(() => CarritoDeCompra)
  updateCarritoDeCompra(@Args('updateCarritoDeCompraInput') updateCarritoDeCompraInput: UpdateCarritoDeCompraInput) {
    return this.carritoDeComprasService.update(updateCarritoDeCompraInput.id, updateCarritoDeCompraInput);
  }

  @Mutation(() => CarritoDeCompra)
  removeCarritoDeCompra(@Args('id', { type: () => Int }) id: number) {
    return this.carritoDeComprasService.remove(id);
  }
}
