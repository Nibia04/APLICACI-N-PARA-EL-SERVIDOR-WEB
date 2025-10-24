import { Test, TestingModule } from '@nestjs/testing';
import { TrajetasVirtualesResolver } from './trajetas-virtuales.resolver';
import { TrajetasVirtualesService } from './trajetas-virtuales.service';

describe('TrajetasVirtualesResolver', () => {
  let resolver: TrajetasVirtualesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrajetasVirtualesResolver, TrajetasVirtualesService],
    }).compile();

    resolver = module.get<TrajetasVirtualesResolver>(TrajetasVirtualesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
