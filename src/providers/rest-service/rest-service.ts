import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {

  apiKey = 'ccc731c9642219a5b1240b58b3003235'
  apiUrl = 'http://api.openweathermap.org/data/2.5/';

  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }
  
  cityWeather(city: string, country: string) {
    let url = this.apiUrl + 'weather';
    url += '?q=' + city;
    url += ',' + country;
    url += '&APPID=' + this.apiKey;

    return this.http.get(url)
  }

  forecast(cityId: string, numOfDays: number) {
    let url = this.apiUrl + 'forecast';
    url += '?id=' + cityId;
    url += '&cnt=' + numOfDays;
    url += '&APPID=' + this.apiKey;

    return this.http.get(url)
  }

  

}
