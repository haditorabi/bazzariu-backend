import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductsResolver } from './business-products.resolver';

describe('BusinessProductsResolver', () => {
  let resolver: BusinessProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductsResolver],
    }).compile();

    resolver = module.get<BusinessProductsResolver>(BusinessProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
