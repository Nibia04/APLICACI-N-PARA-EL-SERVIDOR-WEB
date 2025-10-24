import { Test, TestingModule } from '@nestjs/testing';
import { DetallesCarritoService } from './detalles-carrito.service';

describe('DetallesCarritoService', () => {
  let service: DetallesCarritoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesCarritoService],
    }).compile();

    service = module.get<DetallesCarritoService>(DetallesCarritoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
