import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { AppController } from './app.controller';
import { CountryModule } from '../country/country.module';
import { BusinessCategoryModule } from '../business-category/business-category.module';
import { BusinessDealModule } from '../business-deal/business-deal.module';
import { BusinessHourModule } from '../business-hour/business-hour.module';
import { BusinessLocationModule } from '../business-location/business-location.module';
import { ProvinceModule } from '../province/province.module';

@Module({
  imports: [
    // Configure the ConfigModule to be global
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    // Configure the GraphQLModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generates schema.gql automatically
      sortSchema: true, // Optional: Sorts fields in schema alphabetically
    }),
    AuthModule,
    UserModule,
    BusinessCategoryModule,
    BusinessDealModule,
    BusinessHourModule,
    BusinessLocationModule,
    CountryModule,
    ProvinceModule,
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule {}
