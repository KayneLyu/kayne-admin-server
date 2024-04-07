import { Controller,Ip, Get, Inject,Session, Query, SetMetadata, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';
@Controller()
@SetMetadata('roles',['user'])
export class AppController {
  constructor(private readonly appService: AppService) { }
  // 属性注入
  // @Inject(AppService)
  // private appService: AppService;

  @Get()
  getHello(): string {
    console.log('请求了接口-----');
    return this.appService.getHello();
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
  @UseGuards(LoginGuard)
  @SetMetadata('roles',['admin'])
  aa(): string {
    console.log('aa');
    return 'aa'
  }
  @Get('cc')
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
