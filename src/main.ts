import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle("일정관리 API")
    .setDescription("회사에서 사용하는 간단한 일정관리 앱을 위한 API")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      // operationsSorter: 'alpha',
    },
  });
  SwaggerModule.setup("api-docs", app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      tagsSorter: 'alpha',
      // operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}
bootstrap();
