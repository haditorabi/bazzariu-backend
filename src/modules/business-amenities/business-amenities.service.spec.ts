import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAmenitiesService } from './business-amenities.service';

describe('BusinessAmenitiesService', () => {
  let service: BusinessAmenitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessAmenitiesService],
    }).compile();

    service = module.get<BusinessAmenitiesService>(BusinessAmenitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
