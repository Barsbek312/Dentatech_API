import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Dentatech API service")
    .setDescription("This is beta-test API was created by Suiunbek Barsbek")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  
  // Включаем поддержку CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });

  // Используем глобальные канализационные трубы для валидации
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(3333);
}
bootstrap();

