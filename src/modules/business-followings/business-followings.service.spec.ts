import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFollowingsService } from './business-followings.service';

describe('BusinessFollowingsService', () => {
  let service: BusinessFollowingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessFollowingsService],
    }).compile();

    service = module.get<BusinessFollowingsService>(BusinessFollowingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
