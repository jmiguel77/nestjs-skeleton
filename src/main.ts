import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { checkForBearerToken } from './middlewares/security.middleware';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

let port = 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(checkForBearerToken);

  const configService = app.get(ConfigService);
  port = configService.get('PORT');
  await app.listen(port);
}

bootstrap().then(() =>
  console.log(`server started at http:\\localhost:${port}`),
);
