import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    // Configure the ConfigModule to be global
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    // Configure the GraphQLModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Generates schema.gql automatically
      sortSchema: true, // Optional: Sorts fields in schema alphabetically
    }),
  ],
})
export class AppModule {}
