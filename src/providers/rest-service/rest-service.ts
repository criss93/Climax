import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {

  apiKey = 'ccc731c9642219a5b1240b58b3003235'
  apiUrl = 'http://api.openweathermap.org/data/2.5/';
  lon: number;
  lat: number;

  constructor(public http: HttpClient, private geolocation: Geolocation) {
    console.log('Hello RestServiceProvider Provider');
  }

  cityWeather(city: string, country: string) {
    let url = this.apiUrl + 'weather';
    url += '?q=' + city;
    url += ',' + country;
    url += '&APPID=' + this.apiKey;

    return this.http.get(url)
  }

  forecast(cityname: string, countryCode: string, numOfDays: number) {
    let url = this.apiUrl + 'forecast';
    url += '?q=' + cityname;
    url += ',' + countryCode;
    url += '&cnt=' + numOfDays;
    url += '&APPID=' + this.apiKey;

    return this.http.get(url)
  }

  test(city: string ){
    let url = this.apiUrl + 'weather';
    url += '?q=' + city;
    url += '&APPID=' + this.apiKey;

    return this.http.get(url)
  }

  // localWeather(numOfDays: number) {

  //   this.geolocation.getCurrentPosition().then(resp => {
  //     let lat = resp.coords.latitude;
  //     let lon = resp.coords.longitude;
  //     this.lat = lat;
  //     this.lon = lon;
  //   });
  //   let url = this.apiUrl + 'weather';
  //   url += `?lat=${this.lat}&lon=${this.lon}`;
  //   // url += '&cnt=' + numOfDays;
  //   url += '&APPID=' + this.apiKey;

  //   return this.http.get(url)
  // }

  localWeather() {
    let obs = Observable.create(observer => {
      this.geolocation.getCurrentPosition().then(resp => {
        let lat = resp.coords.latitude;
        let lon = resp.coords.longitude;
        let url = this.apiUrl + 'weather';
        url += `?lat=${lat}&lon=${lon}`;
        url += '&APPID=' + this.apiKey;

        this.http.get(url).subscribe(data => {
          observer.next(data)
        } )
      }).catch((error) => {
        console.log(error);
      });
    });

    return obs;
  }

  



}
