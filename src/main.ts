import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Auth-Token');
    next();
  });

  app.enableCors({
    allowedHeaders: '*',
    origin: [
      'http://localhost:8100'
    ],
  });

  

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