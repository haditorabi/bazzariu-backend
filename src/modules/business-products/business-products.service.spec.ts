import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductsService } from './business-products.service';

describe('BusinessProductsService', () => {
  let service: BusinessProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductsService],
    }).compile();

    service = module.get<BusinessProductsService>(BusinessProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
