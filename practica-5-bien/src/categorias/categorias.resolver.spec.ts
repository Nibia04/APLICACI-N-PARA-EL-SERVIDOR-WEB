import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasResolver } from './categorias.resolver';
import { CategoriasService } from './categorias.service';

describe('CategoriasResolver', () => {
  let resolver: CategoriasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasResolver, CategoriasService],
    }).compile();

    resolver = module.get<CategoriasResolver>(CategoriasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
