import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTagService } from './business-tag.service';

describe('BusinessTagService', () => {
  let service: BusinessTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessTagService],
    }).compile();

    service = module.get<BusinessTagService>(BusinessTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
