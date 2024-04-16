import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, lastValueFrom } from 'rxjs';
import type { AxiosResponse } from 'axios';
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";


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

  @Inject(CACHE_MANAGER)
  private readonly cache: Cache

  private async fetchWeather(): Promise<IWeatherInfo> {
    try {
      // 高德天气
      const resultObservable = await this.httpService.get('https://restapi.amap.com/v3/weather/weatherInfo', {
        params: {
          key: '9d2f7ea76160447a2b1b5bcf93750310',
          city: '441900'
        }
      })
      const responseData: AxiosResponse<IWeather> = await lastValueFrom(resultObservable)
      const weatherInfo = responseData.data.lives[0]
      return weatherInfo
    } catch (error) {
      throw new Error('获取天气数据出错')
    }
  }

  async getWeather(): Promise<IWeatherInfo> {
    // 尝试从缓存中获取数据
    const cachedData:IWeatherInfo = await this.cache.get('weather-data');
    if (cachedData) {
      return cachedData;
    }
    // 如果缓存中没有数据，则从第三方接口获取数据
    const newData = await this.fetchWeather();

    // 将数据存入缓存，并设置过期时间（假设每天 12 点更新）
    await this.cache.set('weather-data', newData,  60 * 60 * 4 * 1000 ); // 缓存 4 小时
    return newData;
  }

  async getSentence(): Promise<any> {
    try {
      const result = await this.httpService.get('https://open.saintic.com/api/sentence/')
      const responseData: AxiosResponse<any> = await lastValueFrom(result)
      return responseData.data.data
    } catch (error) {
      throw new Error('获取诗句数据出错')
    }
  }

  readService() {
    return 'Its a test'
  }
}
