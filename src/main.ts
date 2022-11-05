import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { handleSwagger } from '@utils/handle/handleSwagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const PORT = process.env.PORT || 3000;
  handleSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  console.log(process.env.JWT_SECRET);
  await app.listen(PORT);
}
bootstrap();
