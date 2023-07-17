import {  HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exeption/http-exception.filter';
import { AllExceptionsFilter } from './exeption/all_exception.filter';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalFilters(new AllExceptionsFilter( app.get(HttpAdapterHost)));
  await app.listen(3000);
}
bootstrap();
