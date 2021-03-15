import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle('Solteca APIs')
    .setDescription('Everything about Solteca APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact('Solteca Admin', '','ventas@soltecaindustrial.co')
    .build();
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
