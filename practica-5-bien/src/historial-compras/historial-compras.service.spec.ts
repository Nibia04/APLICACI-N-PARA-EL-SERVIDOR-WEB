import { Test, TestingModule } from '@nestjs/testing';
import { HistorialComprasService } from './historial-compras.service';

describe('HistorialComprasService', () => {
  let service: HistorialComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialComprasService],
    }).compile();

    service = module.get<HistorialComprasService>(HistorialComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
