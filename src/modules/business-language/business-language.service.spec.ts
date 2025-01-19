import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLanguageService } from './business-language.service';

describe('BusinessLanguageService', () => {
  let service: BusinessLanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLanguageService],
    }).compile();

    service = module.get<BusinessLanguageService>(BusinessLanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
