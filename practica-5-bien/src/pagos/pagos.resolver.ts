import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';
import { CreatePagoInput } from './dto/create-pago.input';
import { UpdatePagoInput } from './dto/update-pago.input';

@Resolver(() => Pago)
export class PagosResolver {
  constructor(private readonly pagosService: PagosService) {}

  @Mutation(() => Pago)
  createPago(@Args('createPagoInput') createPagoInput: CreatePagoInput) {
    return this.pagosService.create(createPagoInput);
  }

  @Query(() => [Pago], { name: 'pagos' })
  findAll() {
    return this.pagosService.findAll();
  }

  @Query(() => Pago, { name: 'pago' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pagosService.findOne(id);
  }

  @Mutation(() => Pago)
  updatePago(@Args('updatePagoInput') updatePagoInput: UpdatePagoInput) {
    return this.pagosService.update(updatePagoInput.id, updatePagoInput);
  }

  @Mutation(() => Pago)
  removePago(@Args('id', { type: () => Int }) id: number) {
    return this.pagosService.remove(id);
  }
}
