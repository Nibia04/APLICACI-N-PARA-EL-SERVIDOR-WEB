import { Test, TestingModule } from '@nestjs/testing';
import { PagosResolver } from './pagos.resolver';
import { PagosService } from './pagos.service';

describe('PagosResolver', () => {
  let resolver: PagosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosResolver, PagosService],
    }).compile();

    resolver = module.get<PagosResolver>(PagosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
