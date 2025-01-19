import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLanguageResolver } from './business-language.resolver';

describe('BusinessLanguageResolver', () => {
  let resolver: BusinessLanguageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLanguageResolver],
    }).compile();

    resolver = module.get<BusinessLanguageResolver>(BusinessLanguageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
