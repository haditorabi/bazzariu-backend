import { Test, TestingModule } from '@nestjs/testing';
import { BusinessAmenityService } from './business-amenity.service';

describe('BusinessAmenityService', () => {
  let service: BusinessAmenityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessAmenityService],
    }).compile();

    service = module.get<BusinessAmenityService>(BusinessAmenityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
