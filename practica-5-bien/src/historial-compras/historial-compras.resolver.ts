import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HistorialComprasService } from './historial-compras.service';
import { HistorialCompra } from './entities/historial-compra.entity';
import { CreateHistorialCompraInput } from './dto/create-historial-compra.input';
import { UpdateHistorialCompraInput } from './dto/update-historial-compra.input';

@Resolver(() => HistorialCompra)
export class HistorialComprasResolver {
  constructor(private readonly historialComprasService: HistorialComprasService) {}

  @Mutation(() => HistorialCompra)
  createHistorialCompra(@Args('createHistorialCompraInput') createHistorialCompraInput: CreateHistorialCompraInput) {
    return this.historialComprasService.create(createHistorialCompraInput);
  }

  @Query(() => [HistorialCompra], { name: 'historialCompras' })
  findAll() {
    return this.historialComprasService.findAll();
  }

  @Query(() => HistorialCompra, { name: 'historialCompra' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.historialComprasService.findOne(id);
  }

  @Mutation(() => HistorialCompra)
  updateHistorialCompra(@Args('updateHistorialCompraInput') updateHistorialCompraInput: UpdateHistorialCompraInput) {
    return this.historialComprasService.update(updateHistorialCompraInput.id, updateHistorialCompraInput);
  }

  @Mutation(() => HistorialCompra)
  removeHistorialCompra(@Args('id', { type: () => Int }) id: number) {
    return this.historialComprasService.remove(id);
  }
}
