import { Module } from '@nestjs/common';
import { DealsRedemptionService } from './deal-redemption.service';
import { DealsRedemptionResolver } from './deal-redemption.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [DealsRedemptionService, DealsRedemptionResolver],
})
export class DealsRedemptionModule {}
