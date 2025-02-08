import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, UserRole, UserStatus } from '@prisma/client';
import { ServiceErrorHandler } from 'src/common/decorators/ServiceErrorHandler';
import { PaginationArgs } from 'src/graphql/pagination-args-types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { email: string; password: string; name: string }) {
    try {
      return await this.prisma.user.create({
        data: {
          email: data.email,
          password: data.password,
          name: data.name,
          role: UserRole.USER,
          status: UserStatus.ACTIVE,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  @ServiceErrorHandler('update a user')
  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async findOne(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
  @ServiceErrorHandler('fetch users with pagination')
  async findAll(paginationArgs: PaginationArgs) {
    const { take, skip } = paginationArgs;
    return this.prisma.user.findMany({
      skip,
      take,
    });
  }
  @ServiceErrorHandler('delete a user')
  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  @ServiceErrorHandler('fetch BusinessFollowing')
  async getBusinessFollowing(userId: string) {
    return this.prisma.businessFollowing.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch DealsRedemption')
  async getDealsRedemption(userId: string) {
    return this.prisma.dealsRedemption.findMany({
      where: { user: { id: userId } },
    });
  }

  @ServiceErrorHandler('fetch PaymentMethods')
  async getPaymentMethods(userId: string) {
    return this.prisma.paymentMethod.findMany({
      where: { userId: userId },
    });
  }

  @ServiceErrorHandler('fetch Payments')
  async getPayments(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId: userId },
    });
  }

  @ServiceErrorHandler('fetch Reports')
  async getReports(userId: string) {
    return this.prisma.report.findMany({
      where: { byId: userId },
    });
  }

  @ServiceErrorHandler('fetch Transactions')
  async getTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserActions')
  async getUserActions(userId: string) {
    return this.prisma.userAction.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserActionLogs')
  async getUserActionLogs(userId: string) {
    return this.prisma.userActionLog.findMany({
      where: { userId },
    });
  }
  @ServiceErrorHandler('fetch UserBlocked')
  async getUserBlockeds(userId: string) {
    return this.prisma.userBlocked.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch BlockedBy')
  async getBlockedBys(userId: string) {
    return this.prisma.userBlocked.findMany({
      where: { blockedId: userId },
    });
  }

  @ServiceErrorHandler('fetch UserBooking')
  async getUserBookings(userId: string) {
    return this.prisma.userBooking.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserBookmark')
  async getUserBookmarks(userId: string) {
    return this.prisma.userBookmark.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserCheckin')
  async getUserCheckins(userId: string) {
    return this.prisma.userCheckin.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserFollowing')
  async getUserFollowings(userId: string) {
    return this.prisma.userFollowing.findMany({
      where: { followerId: userId },
    });
  }

  @ServiceErrorHandler('fetch UserFollowee')
  async getUserFollowees(userId: string) {
    return this.prisma.userFollowing.findMany({
      where: { followeeId: userId },
    });
  }

  @ServiceErrorHandler('fetch UserReview')
  async getUserReviews(userId: string) {
    return this.prisma.userReview.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserScore')
  async getUserScores(userId: string) {
    return this.prisma.userScore.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserVerification')
  async getUserVerifications(userId: string) {
    return this.prisma.userVerification.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserWallet')
  async getUserWallets(userId: string) {
    return this.prisma.userWallet.findMany({
      where: { userId },
    });
  }

  @ServiceErrorHandler('fetch UserPreference')
  async getUserPreferences(userId: string) {
    return this.prisma.userPreference.findMany({
      where: { userId },
    });
  }
}
