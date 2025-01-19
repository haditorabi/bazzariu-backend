import { Test, TestingModule } from '@nestjs/testing';
import { UserReviewResolver } from './user-review.resolver';

describe('UserReviewResolver', () => {
  let resolver: UserReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserReviewResolver],
    }).compile();

    resolver = module.get<UserReviewResolver>(UserReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
