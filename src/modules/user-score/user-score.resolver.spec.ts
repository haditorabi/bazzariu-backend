import { Test, TestingModule } from '@nestjs/testing';
import { UserScoreResolver } from './user-score.resolver';

describe('UserScoreResolver', () => {
  let resolver: UserScoreResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScoreResolver],
    }).compile();

    resolver = module.get<UserScoreResolver>(UserScoreResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
