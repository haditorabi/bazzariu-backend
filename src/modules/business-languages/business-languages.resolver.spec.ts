import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLanguagesResolver } from './business-languages.resolver';

describe('BusinessLanguagesResolver', () => {
  let resolver: BusinessLanguagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLanguagesResolver],
    }).compile();

    resolver = module.get<BusinessLanguagesResolver>(BusinessLanguagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
