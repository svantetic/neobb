import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as nunjucks from 'nunjucks';

const port = 8080;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const renderEngine = nunjucks.configure(
    join(__dirname, '../src', 'views'),
    {
      autoescape: true,
      throwOnUndefined: false,
      trimBlocks: false,
      lstripBlocks: false,
      watch: true,
      noCache: process.env.NODE_ENV === "local" ? true : false,
      express: app
    }
  );
  app.engine('njk', renderEngine.render);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('njk');
  app.set('view cache', true);
  console.log('staring');
  await app.listen(port);

}
bootstrap();
