import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUsers(
    @Args('page', { type: () => Number, nullable: true }) page: number = 1,
    @Args('limit', { type: () => Number, nullable: true }) limit: number = 10,
  ) {
    return this.userService.getAllUsers(page, limit);
  }

  @ResolveField()
  async BusinessFollowing(@Parent() user: User) {
    return this.userService.getBusinessFollowing(user.id);
  }

  @ResolveField()
  async DealsRedemption(@Parent() user: User) {
    return this.userService.getDealsRedemption(user.id);
  }

  @ResolveField()
  async PaymentMethod(@Parent() user: User) {
    return this.userService.getPaymentMethods(user.id);
  }

  @ResolveField()
  async Payment(@Parent() user: User) {
    return this.userService.getPayments(user.id);
  }

  @ResolveField()
  async Report(@Parent() user: User) {
    return this.userService.getReports(user.id);
  }

  @ResolveField()
  async Transaction(@Parent() user: User) {
    return this.userService.getTransactions(user.id);
  }

  @ResolveField()
  async UserAction(@Parent() user: User) {
    return this.userService.getUserActions(user.id);
  }

  @ResolveField()
  async UserActionLog(@Parent() user: User) {
    return this.userService.getUserActionLogs(user.id);
  }

  @ResolveField()
  async UserBlocked(@Parent() user: User) {
    return this.userService.getUserBlockeds(user.id);
  }

  @ResolveField()
  async BlockedBy(@Parent() user: User) {
    return this.userService.getBlockedBys(user.id);
  }

  @ResolveField()
  async UserBooking(@Parent() user: User) {
    return this.userService.getUserBookings(user.id);
  }

  @ResolveField()
  async UserBookmark(@Parent() user: User) {
    return this.userService.getUserBookmarks(user.id);
  }

  @ResolveField()
  async UserCheckin(@Parent() user: User) {
    return this.userService.getUserCheckins(user.id);
  }

  @ResolveField()
  async UserFollowing(@Parent() user: User) {
    return this.userService.getUserFollowings(user.id);
  }

  @ResolveField()
  async UserFollowee(@Parent() user: User) {
    return this.userService.getUserFollowees(user.id);
  }

  @ResolveField()
  async UserReview(@Parent() user: User) {
    return this.userService.getUserReviews(user.id);
  }

  @ResolveField()
  async UserScore(@Parent() user: User) {
    return this.userService.getUserScores(user.id);
  }

  @ResolveField()
  async UserVerification(@Parent() user: User) {
    return this.userService.getUserVerifications(user.id);
  }

  @ResolveField()
  async UserWallet(@Parent() user: User) {
    return this.userService.getUserWallets(user.id);
  }

  @ResolveField()
  async UserPreference(@Parent() user: User) {
    return this.userService.getUserPreferences(user.id);
  }
}
