import { Module } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { EventCategoriesResolver } from './event-categories.resolver';

@Module({
  providers: [EventCategoriesService, EventCategoriesResolver]
})
export class EventCategoriesModule {}
