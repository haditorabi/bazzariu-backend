import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductsPricesService } from './business-products-prices.service';

describe('BusinessProductsPricesService', () => {
  let service: BusinessProductsPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductsPricesService],
    }).compile();

    service = module.get<BusinessProductsPricesService>(BusinessProductsPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
