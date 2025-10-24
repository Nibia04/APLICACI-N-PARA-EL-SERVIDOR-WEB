import { Test, TestingModule } from '@nestjs/testing';
import { CarritoDeComprasService } from './carrito-de-compras.service';

describe('CarritoDeComprasService', () => {
  let service: CarritoDeComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarritoDeComprasService],
    }).compile();

    service = module.get<CarritoDeComprasService>(CarritoDeComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
