import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductPriceService } from './business-product-price.service';

describe('BusinessProductPriceService', () => {
  let service: BusinessProductPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductPriceService],
    }).compile();

    service = module.get<BusinessProductPriceService>(
      BusinessProductPriceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
