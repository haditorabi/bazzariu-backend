import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBoostResolver } from './business-boost.resolver';

describe('BusinessBoostResolver', () => {
  let resolver: BusinessBoostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessBoostResolver],
    }).compile();

    resolver = module.get<BusinessBoostResolver>(BusinessBoostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
