import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.graphql';
import { PaginationArgs } from 'src/graphql/pagination-args-types';
import { BusinessFollowing } from '../business-following/business-following.graphql';
import { DealsRedemption } from '../deal-redemption/deal-redemption.graphql';
import { PaymentMethod } from '../payment-method/payment-method.graphql';
import { Payment } from '../payment/payment.graphql';
import { Transaction } from '../transaction/transaction.graphql';
import { UserAction } from '../user-action/user-action.graphql';
import { UserActionLog } from '../user-action-log/user-action-log.graphql';
import { UserBlocked } from '../user-blocked/user-blocked.graphql';
import { CommonUser } from 'src/graphql/user.type';
import { UserBooking } from '../user-booking/user-booking.graphql';
import { UserBookmark } from '../user-bookmark/user-bookmark.graphql';
import { UserCheckin } from '../user-checkin/user-checkin.graphql';
import { UserReview } from '../user-review/user-review.graphql';
import { UserScore } from '../user-score/user-score.graphql';
import { UserVerification } from '../user-verification/user-verification.graphql';
import { UserWallet } from '../user-wallet/user-wallet.graphql';
import { UserPreference } from '../user-preference/user-preference.graphql';
import { Report } from '../report/report.graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(@Args() paginationArgs: PaginationArgs) {
    return this.userService.getAllUsers(paginationArgs);
  }
  @Query(() => User)
  async user(@Args('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @ResolveField(() => [BusinessFollowing])
  async BusinessFollowing(@Parent() user: User) {
    return this.userService.getBusinessFollowing(user.id);
  }

  @ResolveField(() => [DealsRedemption])
  async DealsRedemption(@Parent() user: User) {
    return this.userService.getDealsRedemption(user.id);
  }

  @ResolveField(() => [PaymentMethod])
  async PaymentMethod(@Parent() user: User) {
    return this.userService.getPaymentMethods(user.id);
  }

  @ResolveField(() => [Payment])
  async Payment(@Parent() user: User) {
    return this.userService.getPayments(user.id);
  }

  @ResolveField(() => [Report])
  async Report(@Parent() user: User) {
    return this.userService.getReports(user.id);
  }

  @ResolveField(() => [Transaction])
  async Transaction(@Parent() user: User) {
    return this.userService.getTransactions(user.id);
  }

  @ResolveField(() => [UserAction])
  async UserAction(@Parent() user: User) {
    return this.userService.getUserActions(user.id);
  }

  @ResolveField(() => [UserActionLog])
  async UserActionLog(@Parent() user: User) {
    return this.userService.getUserActionLogs(user.id);
  }

  @ResolveField(() => [UserBlocked])
  async UserBlocked(@Parent() user: User) {
    return this.userService.getUserBlockeds(user.id);
  }

  @ResolveField(() => [CommonUser])
  async BlockedBy(@Parent() user: User) {
    return this.userService.getBlockedBys(user.id);
  }

  @ResolveField(() => [UserBooking])
  async UserBooking(@Parent() user: User) {
    return this.userService.getUserBookings(user.id);
  }

  @ResolveField(() => [UserBookmark])
  async UserBookmark(@Parent() user: User) {
    return this.userService.getUserBookmarks(user.id);
  }

  @ResolveField(() => [UserCheckin])
  async UserCheckin(@Parent() user: User) {
    return this.userService.getUserCheckins(user.id);
  }

  @ResolveField(() => [CommonUser])
  async UserFollowing(@Parent() user: User) {
    return this.userService.getUserFollowings(user.id);
  }

  @ResolveField(() => [CommonUser])
  async UserFollowee(@Parent() user: User) {
    return this.userService.getUserFollowees(user.id);
  }

  @ResolveField(() => [UserReview])
  async UserReview(@Parent() user: User) {
    return this.userService.getUserReviews(user.id);
  }

  @ResolveField(() => [UserScore])
  async UserScore(@Parent() user: User) {
    return this.userService.getUserScores(user.id);
  }

  @ResolveField(() => [UserVerification])
  async UserVerification(@Parent() user: User) {
    return this.userService.getUserVerifications(user.id);
  }

  @ResolveField(() => [UserWallet])
  async UserWallet(@Parent() user: User) {
    return this.userService.getUserWallets(user.id);
  }

  @ResolveField(() => [UserPreference])
  async UserPreference(@Parent() user: User) {
    return this.userService.getUserPreferences(user.id);
  }
}
