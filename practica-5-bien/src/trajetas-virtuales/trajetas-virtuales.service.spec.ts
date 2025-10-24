import { Test, TestingModule } from '@nestjs/testing';
import { TrajetasVirtualesService } from './trajetas-virtuales.service';

describe('TrajetasVirtualesService', () => {
  let service: TrajetasVirtualesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrajetasVirtualesService],
    }).compile();

    service = module.get<TrajetasVirtualesService>(TrajetasVirtualesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
