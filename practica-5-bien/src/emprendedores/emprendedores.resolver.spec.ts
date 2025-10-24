import { Test, TestingModule } from '@nestjs/testing';
import { EmprendedoresResolver } from './emprendedores.resolver';
import { EmprendedoresService } from './emprendedores.service';

describe('EmprendedoresResolver', () => {
  let resolver: EmprendedoresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmprendedoresResolver, EmprendedoresService],
    }).compile();

    resolver = module.get<EmprendedoresResolver>(EmprendedoresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
