import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFollowingResolver } from './business-following.resolver';

describe('BusinessFollowingResolver', () => {
  let resolver: BusinessFollowingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessFollowingResolver],
    }).compile();

    resolver = module.get<BusinessFollowingResolver>(BusinessFollowingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
