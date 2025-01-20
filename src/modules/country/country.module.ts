import { Module } from '@nestjs/common';
import { CountryResolver } from './country.resolver';
import { CountryService } from './country.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CountryService, CountryResolver],
})
export class CountryModule {}
