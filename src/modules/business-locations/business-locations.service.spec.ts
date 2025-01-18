import { Test, TestingModule } from '@nestjs/testing';
import { BusinessLocationsService } from './business-locations.service';

describe('BusinessLocationsService', () => {
  let service: BusinessLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessLocationsService],
    }).compile();

    service = module.get<BusinessLocationsService>(BusinessLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
