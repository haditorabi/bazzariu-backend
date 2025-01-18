import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoriesResolver } from './product-categories.resolver';

describe('ProductCategoriesResolver', () => {
  let resolver: ProductCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCategoriesResolver],
    }).compile();

    resolver = module.get<ProductCategoriesResolver>(ProductCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
