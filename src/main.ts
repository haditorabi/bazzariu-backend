import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply Global Filters
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes unknown fields
      forbidNonWhitelisted: true, // Throws an error on unknown fields
      transform: true, // Automatically transforms input to DTOs
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.map((err) => ({
          [err.property]: Object.values(err.constraints).join(', '),
        }));

        if (process.env.NODE_ENV === 'production') {
          return new BadRequestException({
            message: JSON.stringify(formattedErrors),
          });
        }

        return new BadRequestException({
          message: JSON.stringify(formattedErrors),
          stack: new Error().stack, // Only include stack trace in development
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
