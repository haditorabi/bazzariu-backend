import { Test, TestingModule } from '@nestjs/testing';
import { EventCategoryResolver } from './event-category.resolver';

describe('EventCategoryResolver', () => {
  let resolver: EventCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCategoryResolver],
    }).compile();

    resolver = module.get<EventCategoryResolver>(EventCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
