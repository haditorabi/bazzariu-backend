import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTagsService } from './business-tags.service';

describe('BusinessTagsService', () => {
  let service: BusinessTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessTagsService],
    }).compile();

    service = module.get<BusinessTagsService>(BusinessTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
