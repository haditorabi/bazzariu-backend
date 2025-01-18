import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAmenitiesResolver } from './business-amenities.resolver';

describe('BusinessAmenitiesResolver', () => {
  let resolver: BusinessAmenitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessAmenitiesResolver],
    }).compile();

    resolver = module.get<BusinessAmenitiesResolver>(BusinessAmenitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
