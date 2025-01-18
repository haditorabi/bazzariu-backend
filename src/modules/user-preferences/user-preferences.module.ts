import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferencesResolver } from './user-preferences.resolver';

@Module({
  providers: [UserPreferencesService, UserPreferencesResolver]
})
export class UserPreferencesModule {}
