import { Test, TestingModule } from '@nestjs/testing';
import { UserScoresResolver } from './user-scores.resolver';

describe('UserScoresResolver', () => {
  let resolver: UserScoresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserScoresResolver],
    }).compile();

    resolver = module.get<UserScoresResolver>(UserScoresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
