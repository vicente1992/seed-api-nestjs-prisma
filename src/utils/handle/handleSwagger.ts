import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function handleSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Seed api')
    .setDescription('The Seed API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('city')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/documentation', app, document);
}
