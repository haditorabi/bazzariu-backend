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
import { AmenityModule } from '../amenity/amenity.module';
import { BookingTimeSlotModule } from '../booking-time-slot/booking-time-slot.module';
import { BusinessModule } from '../business/business.module';
import { BusinessBookingModule } from '../business-booking/business-booking.module';
import { BusinessBoostModule } from '../business-boost/business-boost.module';
import { BusinessFollowingModule } from '../business-following/business-following.module';
import { BusinessProductModule } from '../business-product/business-product.module';
import { BusinessProductPriceModule } from '../business-product-price/business-product-price.module';
import { BusinessTagModule } from '../business-tag/business-tag.module';
import { BusinessUpdateModule } from '../business-update/business-update.module';
import { CityModule } from '../city/city.module';
import { CurrencyModule } from '../currency/currency.module';
import { DealsRedemptionModule } from '../deal-redemption/deal-redemption.module';
import { EventModule } from '../event/event.module';
import { EventCategoryModule } from '../event-category/event-category.module';
import { LanguageModule } from '../language/language.module';
import { MediaModule } from '../media/media.module';
import { PaymentModule } from '../payment/payment.module';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { RegionModule } from '../region/region.module';
import { ReportModule } from '../report/report.module';
import { TransactionModule } from '../transaction/transaction.module';
import { UserActionModule } from '../user-action/user-action.module';
import { UserActionLogModule } from '../user-action-log/user-action-log.module';
import { UserBlockedModule } from '../user-blocked/user-blocked.module';
import { UserBookingModule } from '../user-booking/user-booking.module';
import { UserBookmarkModule } from '../user-bookmark/user-bookmark.module';
import { UserCheckinModule } from '../user-checkin/user-checkin.module';
import { UserFollowingModule } from '../user-following/user-following.module';
import { UserPreferenceModule } from '../user-preference/user-preference.module';
import { UserReviewModule } from '../user-review/user-review.module';
import { UserScoreModule } from '../user-score/user-score.module';
import { UserWalletModule } from '../user-wallet/user-wallet.module';

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
    AmenityModule,
    BookingTimeSlotModule,
    BusinessModule,
    BusinessBookingModule,
    BusinessBoostModule,
    BusinessCategoryModule,
    BusinessDealModule,
    BusinessFollowingModule,
    BusinessHourModule,
    BusinessLocationModule,
    BusinessProductModule,
    BusinessProductPriceModule,
    BusinessTagModule,
    BusinessUpdateModule,
    CityModule,
    // CurrencyModule,
    // CountryModule,
    // DealsRedemptionModule,
    // EventModule,
    // EventCategoryModule,
    // LanguageModule,
    // MediaModule,
    // PaymentModule,
    // ProductCategoryModule,
    // ProvinceModule,
    // RegionModule,
    // ReportModule,
    // TransactionModule,
    // UserModule,
    // UserActionModule,
    // UserActionLogModule,
    // UserBlockedModule,
    // UserBookingModule,
    // UserBookmarkModule,
    // UserCheckinModule,
    // UserFollowingModule,
    // UserPreferenceModule,
    // UserReviewModule,
    // UserScoreModule,
    // UserActionModule,
    // UserWalletModule,
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule {}
