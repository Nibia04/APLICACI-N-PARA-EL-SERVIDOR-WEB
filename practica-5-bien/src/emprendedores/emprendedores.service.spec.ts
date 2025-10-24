import { Test, TestingModule } from '@nestjs/testing';
import { EmprendedoresService } from './emprendedores.service';

describe('EmprendedoresService', () => {
  let service: EmprendedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmprendedoresService],
    }).compile();

    service = module.get<EmprendedoresService>(EmprendedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
