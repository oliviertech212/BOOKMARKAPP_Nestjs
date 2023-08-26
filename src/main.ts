import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe ({whitelist: true}))


// Api Versioning
app.enableVersioning({
  type: VersioningType.URI,
});

  // swagger documentation
  const config = new DocumentBuilder()
  .setTitle(`Olivieretch's BookmarkApp`)
  .setDescription('This is BookmarkApp') 
  .setVersion('1.0')
  .addTag('Bookmark&Authentcation')
  .addSecurity('token', {
    type: 'apiKey',
    scheme: 'api_key',
    in: 'header',
    name: 'auth-token',
  })
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api-docs', app, document);



  await app.listen(5000);
}
bootstrap();
