import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Simple Blog Application')
    .setDescription('APIs for the simple blog application.')
    .setVersion('1.0.0')
    .setTermsOfService('http://swagger.io/terms/')

    .setLicense(
      'Apache 2.0',
      'http://www.apache.org/licenses/LICENSE- 2.0.html',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/', app, document);
  await app.listen(3000);
}
bootstrap();
