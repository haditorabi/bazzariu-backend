import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateExampleInput, ExampleModel } from './app.model';

@Resolver()
export class AppResolver {
  private examples: ExampleModel[] = [{ id: 1, name: 'Example 1' }];

  @Query(() => [ExampleModel])
  getExamples(): ExampleModel[] {
    return this.examples;
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
