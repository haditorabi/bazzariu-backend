import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealsResolver } from './business-deals.resolver';

describe('BusinessDealsResolver', () => {
  let resolver: BusinessDealsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessDealsResolver],
    }).compile();

    resolver = module.get<BusinessDealsResolver>(BusinessDealsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
