import { Module } from '@nestjs/common';
import { DealRedemtionService } from './deal-redemtion.service';
import { DealRedemtionResolver } from './deal-redemtion.resolver';

@Module({
  providers: [DealRedemtionService, DealRedemtionResolver],
})
export class DealRedemtionModule {}
