import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Amenity } from 'src/modules/amenity/amenity.graphql';
import { BookingTimeSlot } from 'src/modules/booking-time-slot/booking-time-slot.graphql';
import { BusinessBooking } from 'src/modules/business-booking/business-booking.graphql';
import { BusinessBoost } from 'src/modules/business-boost/business-boost.graphql';
import { BusinessCategory } from 'src/modules/business-category/business-category.graphql';
import { BusinessDeal } from 'src/modules/business-deal/business-deal.graphql';
import { BusinessFollowing } from 'src/modules/business-following/business-following.graphql';
import { BusinessHour } from 'src/modules/business-hour/business-hour.graphql';
import { BusinessLocation } from 'src/modules/business-location/business-location.graphql';
import { BusinessProductPrice } from 'src/modules/business-product-price/business-product-price.graphql';
import { BusinessProduct } from 'src/modules/business-product/business-product.graphql';
import { BusinessTag } from 'src/modules/business-tag/business-tag.graphql';
import { BusinessUpdate } from 'src/modules/business-update/business-update.graphql';
import { Business } from 'src/modules/business/business.graphql';
import { City } from 'src/modules/city/city.graphql';
import { Country } from 'src/modules/country/country.graphql';
import { Currency } from 'src/modules/currency/currency.graphql';
import { DealsRedemption } from 'src/modules/deal-redemption/deal-redemption.graphql';
import { EventCategory } from 'src/modules/event-category/event-category.graphql';
import { Event } from 'src/modules/event/event.graphql';
import { Language } from 'src/modules/language/language.graphql';
import { Media } from 'src/modules/media/media.graphql';
import { PaymentMethod } from 'src/modules/payment-method/payment-method.graphql';
import { Payment } from 'src/modules/payment/payment.graphql';
import { ProductCategory } from 'src/modules/product-category/product-category.graphql';
import { Province } from 'src/modules/province/province.graphql';
import { Region } from 'src/modules/region/region.graphql';
import { Report } from 'src/modules/report/report.graphql';
import { Transaction } from 'src/modules/transaction/transaction.graphql';
import { UserActionLog } from 'src/modules/user-action-log/user-action-log.graphql';
import { UserAction } from 'src/modules/user-action/user-action.graphql';
import { UserBlocked } from 'src/modules/user-blocked/user-blocked.graphql';
import { UserBooking } from 'src/modules/user-booking/user-booking.graphql';
import { UserBookmark } from 'src/modules/user-bookmark/user-bookmark.graphql';
import { UserCheckin } from 'src/modules/user-checkin/user-checkin.graphql';
import { UserFollowing } from 'src/modules/user-following/user-following.graphql';
import { UserPreference } from 'src/modules/user-preference/user-preference.graphql';
import { UserReview } from 'src/modules/user-review/user-review.graphql';
import { UserScore } from 'src/modules/user-score/user-score.graphql';
import { UserVerification } from 'src/modules/user-verification/user-verification.graphql';
import { UserWallet } from 'src/modules/user-wallet/user-wallet.graphql';
import { User } from 'src/modules/user/user.graphql';

export function PaginatedResponse<T>(TClass: Type<T>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TClass])
    items: T[];

    @Field(() => Int)
    totalCount: number;
  }

  return PaginatedResponseClass;
}

@ObjectType()
export class PaginatedAmenities extends PaginatedResponse(Amenity) {}
@ObjectType()
export class PaginatedBookingTimeSlot extends PaginatedResponse(
  BookingTimeSlot,
) {}
@ObjectType()
export class PaginatedBusiness extends PaginatedResponse(Business) {}
@ObjectType()
export class PaginatedBusinessBooking extends PaginatedResponse(
  BusinessBooking,
) {}
@ObjectType()
export class PaginatedBusinessBoost extends PaginatedResponse(BusinessBoost) {}
@ObjectType()
export class PaginatedBusinessCategory extends PaginatedResponse(
  BusinessCategory,
) {}
@ObjectType()
export class PaginatedBusinessDeal extends PaginatedResponse(BusinessDeal) {}
@ObjectType()
export class PaginatedBusinessFollowing extends PaginatedResponse(
  BusinessFollowing,
) {}
@ObjectType()
export class PaginatedBusinessHour extends PaginatedResponse(BusinessHour) {}
@ObjectType()
export class PaginatedBusinessLocation extends PaginatedResponse(
  BusinessLocation,
) {}
@ObjectType()
export class PaginatedBusinessProduct extends PaginatedResponse(
  BusinessProduct,
) {}
@ObjectType()
export class PaginatedBusinessProductPrice extends PaginatedResponse(
  BusinessProductPrice,
) {}
@ObjectType()
export class PaginatedBusinessTag extends PaginatedResponse(BusinessTag) {}
@ObjectType()
export class PaginatedBusinessUpdate extends PaginatedResponse(
  BusinessUpdate,
) {}
@ObjectType()
export class PaginatedCity extends PaginatedResponse(City) {}
@ObjectType()
export class PaginatedCountry extends PaginatedResponse(Country) {}
@ObjectType()
export class PaginatedCurrency extends PaginatedResponse(Currency) {}
@ObjectType()
export class PaginatedDealsRedemption extends PaginatedResponse(
  DealsRedemption,
) {}
@ObjectType()
export class PaginatedEvent extends PaginatedResponse(Event) {}
@ObjectType()
export class PaginatedEventCategory extends PaginatedResponse(EventCategory) {}
@ObjectType()
export class PaginatedLanguage extends PaginatedResponse(Language) {}
@ObjectType()
export class PaginatedMedia extends PaginatedResponse(Media) {}
@ObjectType()
export class PaginatedPayment extends PaginatedResponse(Payment) {}
@ObjectType()
export class PaginatedPaymentMethod extends PaginatedResponse(PaymentMethod) {}
@ObjectType()
export class PaginatedProductCategory extends PaginatedResponse(
  ProductCategory,
) {}
@ObjectType()
export class PaginatedProvince extends PaginatedResponse(Province) {}
@ObjectType()
export class PaginatedRegion extends PaginatedResponse(Region) {}
@ObjectType()
export class PaginatedReport extends PaginatedResponse(Report) {}
@ObjectType()
export class PaginatedTransaction extends PaginatedResponse(Transaction) {}
@ObjectType()
export class PaginatedUser extends PaginatedResponse(User) {}
@ObjectType()
export class PaginatedUserAction extends PaginatedResponse(UserAction) {}
@ObjectType()
export class PaginatedUserActionLog extends PaginatedResponse(UserActionLog) {}
@ObjectType()
export class PaginatedUserBlocked extends PaginatedResponse(UserBlocked) {}
@ObjectType()
export class PaginatedUserBooking extends PaginatedResponse(UserBooking) {}
@ObjectType()
export class PaginatedUserBookmark extends PaginatedResponse(UserBookmark) {}
@ObjectType()
export class PaginatedUserCheckin extends PaginatedResponse(UserCheckin) {}
@ObjectType()
export class PaginatedUserFollowing extends PaginatedResponse(UserFollowing) {}
@ObjectType()
export class PaginatedUserPreference extends PaginatedResponse(
  UserPreference,
) {}
@ObjectType()
export class PaginatedUserReview extends PaginatedResponse(UserReview) {}
@ObjectType()
export class PaginatedUserScore extends PaginatedResponse(UserScore) {}
@ObjectType()
export class PaginatedUserVerification extends PaginatedResponse(
  UserVerification,
) {}
@ObjectType()
export class PaginatedUserWallet extends PaginatedResponse(UserWallet) {}
