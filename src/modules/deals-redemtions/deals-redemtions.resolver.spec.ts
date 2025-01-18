import { Test, TestingModule } from '@nestjs/testing';
import { DealsRedemtionsResolver } from './deals-redemtions.resolver';

describe('DealsRedemtionsResolver', () => {
  let resolver: DealsRedemtionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealsRedemtionsResolver],
    }).compile();

    resolver = module.get<DealsRedemtionsResolver>(DealsRedemtionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
