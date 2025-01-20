import { Test, TestingModule } from '@nestjs/testing';
import { DealsRedemptionResolver } from './deal-redemption.resolver';

describe('DealsRedemptionResolver', () => {
  let resolver: DealsRedemptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealsRedemptionResolver],
    }).compile();

    resolver = module.get<DealsRedemptionResolver>(DealsRedemptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
