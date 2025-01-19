import { Module } from '@nestjs/common';
import { BusinessLanguageService } from './business-language.service';
import { BusinessLanguageResolver } from './business-language.resolver';

@Module({
  providers: [BusinessLanguageService, BusinessLanguageResolver],
})
export class BusinessLanguageModule {}
