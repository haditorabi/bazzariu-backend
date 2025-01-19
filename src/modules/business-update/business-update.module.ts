import { Module } from '@nestjs/common';
import { BusinessUpdateService } from './business-update.service';
import { BusinessUpdateResolver } from './business-update.resolver';

@Module({
  providers: [BusinessUpdateService, BusinessUpdateResolver],
})
export class BusinessUpdateModule {}
