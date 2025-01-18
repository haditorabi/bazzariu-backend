import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowingsService } from './user-followings.service';

describe('UserFollowingsService', () => {
  let service: UserFollowingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowingsService],
    }).compile();

    service = module.get<UserFollowingsService>(UserFollowingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
