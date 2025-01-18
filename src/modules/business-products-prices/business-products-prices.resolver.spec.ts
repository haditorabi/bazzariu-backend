import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductsPricesResolver } from './business-products-prices.resolver';

describe('BusinessProductsPricesResolver', () => {
  let resolver: BusinessProductsPricesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductsPricesResolver],
    }).compile();

    resolver = module.get<BusinessProductsPricesResolver>(BusinessProductsPricesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
