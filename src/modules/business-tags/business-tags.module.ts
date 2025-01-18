import { Module } from '@nestjs/common';
import { BusinessTagsService } from './business-tags.service';
import { BusinessTagsResolver } from './business-tags.resolver';

@Module({
  providers: [BusinessTagsService, BusinessTagsResolver]
})
export class BusinessTagsModule {}
