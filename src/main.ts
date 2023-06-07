import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { AppExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  const config = new DocumentBuilder()
    .setTitle('Quiz')
    .setDescription('Quiz API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  app.use(helmet({ crossOriginResourcePolicy: false }));
  const httpAdapter = app.get(HttpAdapterHost, { strict: true });
  app.useGlobalFilters(new AppExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    enableDebugMessages: true,
    stopAtFirstError: true,
    forbidUnknownValues: false,
    exceptionFactory: (error: ValidationError[]) => {
      const _error = error[0];
      return new BadRequestException(Object.values(_error?.constraints)[0]);
    }
  }));
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
