import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCategoriesResolver } from './business-categories.resolver';

describe('BusinessCategoriesResolver', () => {
  let resolver: BusinessCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCategoriesResolver],
    }).compile();

    resolver = module.get<BusinessCategoriesResolver>(BusinessCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
