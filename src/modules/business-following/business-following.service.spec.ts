import { Test, TestingModule } from '@nestjs/testing';
import { BusinessFollowingService } from './business-following.service';

describe('BusinessFollowingService', () => {
  let service: BusinessFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessFollowingService],
    }).compile();

    service = module.get<BusinessFollowingService>(BusinessFollowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
