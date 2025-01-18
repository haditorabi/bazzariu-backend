import { Module } from '@nestjs/common';
import { BusinessLanguagesService } from './business-languages.service';
import { BusinessLanguagesResolver } from './business-languages.resolver';

@Module({
  providers: [BusinessLanguagesService, BusinessLanguagesResolver]
})
export class BusinessLanguagesModule {}
