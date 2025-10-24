import { Test, TestingModule } from '@nestjs/testing';
import { HistorialComprasResolver } from './historial-compras.resolver';
import { HistorialComprasService } from './historial-compras.service';

describe('HistorialComprasResolver', () => {
  let resolver: HistorialComprasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialComprasResolver, HistorialComprasService],
    }).compile();

    resolver = module.get<HistorialComprasResolver>(HistorialComprasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
