import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { AmenityResolver } from './amenity.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AmenityService, AmenityResolver],
})
export class AmenityModule {}
