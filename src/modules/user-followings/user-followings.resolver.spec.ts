import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowingsResolver } from './user-followings.resolver';

describe('UserFollowingsResolver', () => {
  let resolver: UserFollowingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowingsResolver],
    }).compile();

    resolver = module.get<UserFollowingsResolver>(UserFollowingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
