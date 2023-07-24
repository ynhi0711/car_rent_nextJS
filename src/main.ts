import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exeption/http-exception.filter';
import { AllExceptionsFilter } from './exeption/all_exception.filter';

async function bootstrap() {
  const dotenv = require('dotenv');

  if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.dev' });
  } else if (process.env.NODE_ENV === 'staging') {
    dotenv.config({ path: '.env.staging' });
  }
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
