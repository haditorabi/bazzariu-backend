import { Module } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategoryResolver } from './event-category.resolver';

@Module({
  providers: [EventCategoryService, EventCategoryResolver],
})
export class EventCategoryModule {}
