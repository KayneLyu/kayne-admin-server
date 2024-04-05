import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication} from '@nestjs/platform-express';
import { NextFunction, Request, Response} from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public',{prefix: '/static'})
  app.enableCors()
  // app.use(function(req:Request, res:Response, next:NextFunction) {
  //   console.log('before', req.url);
  //   next()
  //   console.log('end');
  // })
  await app.listen(3000);
}
bootstrap();
