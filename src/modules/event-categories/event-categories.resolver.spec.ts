import { Test, TestingModule } from '@nestjs/testing';
import { EventCategoriesResolver } from './event-categories.resolver';

describe('EventCategoriesResolver', () => {
  let resolver: EventCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventCategoriesResolver],
    }).compile();

    resolver = module.get<EventCategoriesResolver>(EventCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
