import { Controller, Get, Inject, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
@Controller()
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
  @Get('aa')
  @UseGuards(LoginGuard)
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
  dd(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}
