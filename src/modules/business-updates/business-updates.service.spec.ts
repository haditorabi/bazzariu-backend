import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUpdatesService } from './business-updates.service';

describe('BusinessUpdatesService', () => {
  let service: BusinessUpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessUpdatesService],
    }).compile();

    service = module.get<BusinessUpdatesService>(BusinessUpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
