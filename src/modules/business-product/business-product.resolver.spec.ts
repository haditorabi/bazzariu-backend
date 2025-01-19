import { Test, TestingModule } from '@nestjs/testing';
import { BusinessProductResolver } from './business-product.resolver';

describe('BusinessProductResolver', () => {
  let resolver: BusinessProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessProductResolver],
    }).compile();

    resolver = module.get<BusinessProductResolver>(BusinessProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
