import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUpdateService } from './business-update.service';

describe('BusinessUpdateService', () => {
  let service: BusinessUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessUpdateService],
    }).compile();

    service = module.get<BusinessUpdateService>(BusinessUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
