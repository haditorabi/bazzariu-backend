import { Module } from '@nestjs/common';
import { BusinessTagService } from './business-tag.service';
import { BusinessTagResolver } from './business-tag.resolver';

@Module({
  providers: [BusinessTagService, BusinessTagResolver]
})
export class BusinessTagModule {}
