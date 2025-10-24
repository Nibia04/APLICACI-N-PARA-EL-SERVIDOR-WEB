import { Test, TestingModule } from '@nestjs/testing';
import { OrdenesResolver } from './ordenes.resolver';
import { OrdenesService } from './ordenes.service';

describe('OrdenesResolver', () => {
  let resolver: OrdenesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenesResolver, OrdenesService],
    }).compile();

    resolver = module.get<OrdenesResolver>(OrdenesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
