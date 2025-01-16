import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CreateExampleInput, ExampleModel } from './app.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
export class AppResolver {
  private examples: ExampleModel[] = [{ id: 1, name: 'Example 1' }];

  @Query(() => [ExampleModel])
  getExamples(): ExampleModel[] {
    return this.examples;
  }

  @Query(() => String)
  @UseGuards(AuthGuard) // Apply JWT Guard to this specific resolver
  protectedQuery(): string {
    return 'This query is protected';
  }

  @Query(() => String)
  publicQuery(): string {
    return 'This query is public';
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  getProtectedData(@Context('req') req: any) {
    return `Hello, ${req.user.name}`;
  }

  @Mutation(() => ExampleModel)
  createExample(@Args('data') data: CreateExampleInput): ExampleModel {
    const newExample = {
      id: this.examples.length + 1,
      ...data,
    };
    this.examples.push(newExample);
    return newExample;
  }
}
