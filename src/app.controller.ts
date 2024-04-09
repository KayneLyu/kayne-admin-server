import { Controller,Ip, Get,Req,Res,Next,Logger, Inject,Session, Query, SetMetadata, UseFilters, UseGuards, UseInterceptors, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
import { NextFunction, Request,Response } from 'express';
import { AaaFilter } from './aaa.filter';
import { AaaException } from './AaaExeption';
import { Roles, Role } from './roles.decorator';

// @Controller({host:':host.0.0.1',path:'bb'})
// @SetMetadata('roles',['user'])
@Controller()
@UseGuards(LoginGuard)
export class AppController {
  private logger = new Logger()
  constructor(private readonly appService: AppService) { }
  // 属性注入
  // @Inject(AppService)
  // private appService: AppService;
  

  @Get()
  @UseFilters(AaaFilter)
  getHello(): string {
    console.log('请求了接口-----');
    throw new AaaException('aaa','bbb')
    // return this.appService.getHello();
  }

  @Get('log')
  log():string {
    this.logger.debug('aaa', AppController.name);
    this.logger.error('bbb', AppController.name);
    this.logger.log('ccc', AppController.name);
    this.logger.verbose('ddd', AppController.name);
    this.logger.warn('eee', AppController.name);
    return this.appService.getHello()
  }

  @Get('bb')
  ee(@Req() req:Request) {
    console.log(req.hostname,'===', req.url);
  }

  @Get('dd')
  ff(@Res() res:Response) {
    res.end('我是ffff')
  }
  @Get('gg')
  gg(@Next() next:NextFunction) {
    console.log('GG');
    next()
    return '1111'
  }
  @Get('gg')
  gg2() {
    console.log('GG2');
    return '1111'
  }
  @Get('kk')
  @Redirect('https://kandev.cn')
  kk() {
    console.log('GG2');
    return '1111'
  }

  @Get('/ip')
  ip(@Ip() ip:string) {
    console.log(ip);
  }
  @Get('/session')
  session(@Session() session) {
    if(!session.count) {
      session.count = 0
    }
    session.count = session.count + 1
    return session.count
  }

  @Get('aa')
  @Roles(Role.Admin,Role.User)
  aa(): string {
    console.log('aa');
    return 'aa'
  }
  @Get('cc')
  @Roles(Role.Admin,Role.User)
  @UseInterceptors(TimeInterceptor)
  bb(): string {
    console.log('bb');
    return 'bb'
  }

  @Get('dd')
  @UseFilters(TestFilter)
  dd(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}
