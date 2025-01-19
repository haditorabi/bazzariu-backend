import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealResolver } from './business-deal.resolver';

describe('BusinessDealResolver', () => {
  let resolver: BusinessDealResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessDealResolver],
    }).compile();

    resolver = module.get<BusinessDealResolver>(BusinessDealResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
