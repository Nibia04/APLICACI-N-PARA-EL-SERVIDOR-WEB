import { Test, TestingModule } from '@nestjs/testing';
import { CarritoDeComprasResolver } from './carrito-de-compras.resolver';
import { CarritoDeComprasService } from './carrito-de-compras.service';

describe('CarritoDeComprasResolver', () => {
  let resolver: CarritoDeComprasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarritoDeComprasResolver, CarritoDeComprasService],
    }).compile();

    resolver = module.get<CarritoDeComprasResolver>(CarritoDeComprasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
