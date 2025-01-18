import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFollowingsResolver } from './business-followings.resolver';

describe('BusinessFollowingsResolver', () => {
  let resolver: BusinessFollowingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessFollowingsResolver],
    }).compile();

    resolver = module.get<BusinessFollowingsResolver>(BusinessFollowingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
