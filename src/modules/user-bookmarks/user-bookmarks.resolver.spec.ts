import { Test, TestingModule } from '@nestjs/testing';
import { UserBookmarksResolver } from './user-bookmarks.resolver';

describe('UserBookmarksResolver', () => {
  let resolver: UserBookmarksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBookmarksResolver],
    }).compile();

    resolver = module.get<UserBookmarksResolver>(UserBookmarksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
