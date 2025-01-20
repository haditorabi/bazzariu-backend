import { Test, TestingModule } from '@nestjs/testing';
import { BusinessBoostService } from './business-boost.service';

describe('BusinessBoostService', () => {
  let service: BusinessBoostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessBoostService],
    }).compile();

    service = module.get<BusinessBoostService>(BusinessBoostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
