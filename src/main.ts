import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

export const dynamicImport = async (
  packageName: string,
) =>
  new Function(
    `return import('${packageName}')`,
  )();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Dentatech API service')
    .setDescription(
      'This is beta-test API was created by Suiunbek Barsbek',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('api', app, document);

  // Включаем поддержку CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Используем глобальные канализационные трубы для валидации
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const adminJSModule =
    await dynamicImport('adminjs');
  const AdminJS = adminJSModule.default;

  const AdminJSPrisma = await dynamicImport(
    '@adminjs/prisma',
  );

  AdminJS.registerAdapter({
    Resource: AdminJSPrisma.Resource,
    Database: AdminJSPrisma.Database, // Change with whatever adapter you want to use
  });

  const globalPrefix = 'admin';



  await app.listen(3333);
  Logger.log(
    `🚀 Application is running on: http://localhost:${3333}/${globalPrefix}`,
  );
}
bootstrap();
