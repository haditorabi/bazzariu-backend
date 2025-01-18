import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesResolver } from './product-categories.resolver';

@Module({
  providers: [ProductCategoriesService, ProductCategoriesResolver]
})
export class ProductCategoriesModule {}
