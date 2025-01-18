import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCategoryResolver } from './business-category.resolver';

describe('BusinessCategoryResolver', () => {
  let resolver: BusinessCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCategoryResolver],
    }).compile();

    resolver = module.get<BusinessCategoryResolver>(BusinessCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
