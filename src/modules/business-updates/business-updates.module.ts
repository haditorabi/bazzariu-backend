import { Module } from '@nestjs/common';
import { BusinessUpdatesService } from './business-updates.service';
import { BusinessUpdatesResolver } from './business-updates.resolver';

@Module({
  providers: [BusinessUpdatesService, BusinessUpdatesResolver]
})
export class BusinessUpdatesModule {}
