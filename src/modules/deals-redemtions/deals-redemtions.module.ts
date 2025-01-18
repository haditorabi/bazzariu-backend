import { Module } from '@nestjs/common';
import { DealsRedemtionsService } from './deals-redemtions.service';
import { DealsRedemtionsResolver } from './deals-redemtions.resolver';

@Module({
  providers: [DealsRedemtionsService, DealsRedemtionsResolver]
})
export class DealsRedemtionsModule {}
