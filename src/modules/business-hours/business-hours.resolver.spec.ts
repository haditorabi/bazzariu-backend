import { Test, TestingModule } from '@nestjs/testing';
import { BusinessHoursResolver } from './business-hours.resolver';

describe('BusinessHoursResolver', () => {
  let resolver: BusinessHoursResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessHoursResolver],
    }).compile();

    resolver = module.get<BusinessHoursResolver>(BusinessHoursResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
