import { Module } from '@nestjs/common';
import { BusinessTagService } from './business-tag.service';
import { BusinessTagResolver } from './business-tag.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessTagService, BusinessTagResolver]
})
export class BusinessTagModule {}
