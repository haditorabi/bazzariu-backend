import { Module } from '@nestjs/common';
import { BusinessLanguageService } from './business-language.service';
import { BusinessLanguageResolver } from './business-language.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BusinessLanguageService, BusinessLanguageResolver],
})
export class BusinessLanguageModule {}
