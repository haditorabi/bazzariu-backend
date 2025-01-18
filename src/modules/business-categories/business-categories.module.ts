import { Module } from '@nestjs/common';
import { BusinessCategoriesService } from './business-categories.service';
import { BusinessCategoriesResolver } from './business-categories.resolver';

@Module({
  providers: [BusinessCategoriesService, BusinessCategoriesResolver]
})
export class BusinessCategoriesModule {}
