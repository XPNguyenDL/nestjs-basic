import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*', // You can set specific origins here, e.g., 'https://example.com'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',

  };

  app.enableCors(corsOptions);

  const config = new DocumentBuilder()
    .setTitle('Tutor connect')
    .setDescription('Tutor connect API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'APIKey',
        name: 'APIKey',
        description: 'Enter API Key (bearer {token})',
        in: 'header',
      },
      'APIKey-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}

bootstrap();