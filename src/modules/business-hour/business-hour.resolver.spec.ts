import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHourResolver } from './business-hour.resolver';

describe('BusinessHourResolver', () => {
  let resolver: BusinessHourResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessHourResolver],
    }).compile();

    resolver = module.get<BusinessHourResolver>(BusinessHourResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
