import { Test, TestingModule } from '@nestjs/testing';
import { DellatesOrdenResolver } from './dellates-orden.resolver';
import { DellatesOrdenService } from './dellates-orden.service';

describe('DellatesOrdenResolver', () => {
  let resolver: DellatesOrdenResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DellatesOrdenResolver, DellatesOrdenService],
    }).compile();

    resolver = module.get<DellatesOrdenResolver>(DellatesOrdenResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
