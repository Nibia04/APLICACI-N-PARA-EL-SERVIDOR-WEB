import { Test, TestingModule } from '@nestjs/testing';
import { DetallesCarritoResolver } from './detalles-carrito.resolver';
import { DetallesCarritoService } from './detalles-carrito.service';

describe('DetallesCarritoResolver', () => {
  let resolver: DetallesCarritoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesCarritoResolver, DetallesCarritoService],
    }).compile();

    resolver = module.get<DetallesCarritoResolver>(DetallesCarritoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
