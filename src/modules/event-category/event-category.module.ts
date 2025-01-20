import { Module } from '@nestjs/common';
import { EventCategoryService } from './event-category.service';
import { EventCategoryResolver } from './event-category.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EventCategoryService, EventCategoryResolver],
})
export class EventCategoryModule {}
