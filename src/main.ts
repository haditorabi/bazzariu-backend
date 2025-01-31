import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transforms plain objects into class instances
      whitelist: true, // Strips out unexpected properties
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
