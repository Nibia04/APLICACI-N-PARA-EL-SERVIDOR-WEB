import { Test, TestingModule } from '@nestjs/testing';
import { FavoritosResolver } from './favoritos.resolver';
import { FavoritosService } from './favoritos.service';

describe('FavoritosResolver', () => {
  let resolver: FavoritosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritosResolver, FavoritosService],
    }).compile();

    resolver = module.get<FavoritosResolver>(FavoritosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
