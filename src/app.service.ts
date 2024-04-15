import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom } from 'rxjs';
import type { AxiosResponse } from 'axios';
type IWeatherInfo = {
  // 省份
  province: string,
  /*
   * 城市名
  */
  city: string,
  adcode: number,
  // 天气
  weather: string,
  // 天气
  temperature: number,
  // 天气
  winddirection: string,
  // 天气
  windpower: string,
  // 天气
  humidity: string,
  // 天气
  reporttime: string,
  temperature_float: number,
  humidity_float: number
}
type IWeather = {
  status: number,
  count: number,
  info: string,
  infocode: number,
  lives: Array<IWeatherInfo>
};
@Injectable()
export class AppService {

  @Inject(HttpService)
  private readonly httpService: HttpService;

  readService() {
    return 'Its a test'
  }
  // Observable<AxiosResponse<IWeather>>
  async getWeather(): Promise<IWeatherInfo> {
    try {
      const resultObservable = await this.httpService.get('https://restapi.amap.com/v3/weather/weatherInfo', {
        params: {
          key: '9d2f7ea76160447a2b1b5bcf93750310',
          city: '441900'
        }
      })
      const responseData:AxiosResponse<IWeather> = await lastValueFrom(resultObservable)
      
      const weatherInfo = responseData.data.lives[0]
      return weatherInfo
    } catch (error) {
      throw new Error('获取数据出错')
    }
  }
}
