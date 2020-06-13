import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

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
      noCache: true,
      express: app,
    }
  );

  
  renderEngine.addFilter('date_local', (str: string, count) => new Date(str).toLocaleString());


  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    })
  );


  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use(function(req, res, next) {
    if (req.session.passport && req.session.passport.user) {
      res.locals.user = req.session.passport.user;
    }
    res.locals.flash = Object.values(req.flash()).join(', ');
    next();   
  });
  app.engine('njk', renderEngine.render);
  app.useStaticAssets(join(__dirname, '../public'), {
    index: false,
    redirect: false
  })
  app.setViewEngine('njk');
  await app.listen(port);

}
bootstrap();
