import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLanguagesService } from './business-languages.service';

describe('BusinessLanguagesService', () => {
  let service: BusinessLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLanguagesService],
    }).compile();

    service = module.get<BusinessLanguagesService>(BusinessLanguagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
