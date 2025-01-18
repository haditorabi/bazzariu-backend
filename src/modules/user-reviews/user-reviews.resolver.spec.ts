import { Test, TestingModule } from '@nestjs/testing';
import { UserReviewsResolver } from './user-reviews.resolver';

describe('UserReviewsResolver', () => {
  let resolver: UserReviewsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserReviewsResolver],
    }).compile();

    resolver = module.get<UserReviewsResolver>(UserReviewsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
