import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductPriceResolver } from './business-product-price.resolver';

describe('BusinessProductPriceResolver', () => {
  let resolver: BusinessProductPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductPriceResolver],
    }).compile();

    resolver = module.get<BusinessProductPriceResolver>(
      BusinessProductPriceResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
