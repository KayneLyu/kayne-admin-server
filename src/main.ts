import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication} from '@nestjs/platform-express';
import { NextFunction, Request, Response} from 'express';
import * as session from 'express-session';
import { MyLogger } from './Mylogger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public',{prefix: '/static'})
  app.enableCors()
  // app.use(function(req:Request, res:Response, next:NextFunction) {
  //   console.log('before', req.url);
  //   next()
  //   console.log('end');
  // })
  app.useLogger(new MyLogger)
  app.use(session({
    secret:'kang',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge:10000
    }
  }))
  await app.listen(3000);
}
bootstrap();
