import { Test, TestingModule } from '@nestjs/testing';
import { DellatesOrdenService } from './dellates-orden.service';

describe('DellatesOrdenService', () => {
  let service: DellatesOrdenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DellatesOrdenService],
    }).compile();

    service = module.get<DellatesOrdenService>(DellatesOrdenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
