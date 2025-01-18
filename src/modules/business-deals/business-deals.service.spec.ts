import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDealsService } from './business-deals.service';

describe('BusinessDealsService', () => {
  let service: BusinessDealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessDealsService],
    }).compile();

    service = module.get<BusinessDealsService>(BusinessDealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
