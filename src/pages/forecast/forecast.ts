import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';

@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {

  citiesList: any;
  forecast = [];
  isMap: boolean;
  byGeo: boolean;
  countryCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: RestServiceProvider) {
    try {
      this.isMap = navParams.get('map');
      if (this.isMap == true) {
        this.byGeo = navParams.get('geo');
        if (this.byGeo = true) {
          this.citiesList = navParams.get('citiesList');
          this.getGeoForecast(this.citiesList.lat, this.citiesList.lon);
        } else {
          this.citiesList = navParams.get('citiesList');
          this.countryCode = navParams.get('countryAux');
          this.getForecast(this.citiesList.name, this.countryCode)
        }
      } else {
        this.citiesList = navParams.get('citiesList');
        this.getForecast(this.citiesList.name, this.citiesList.country)
      }
    } catch (e) {
      console.log(e);
    }
  }

  getForecast(cityId, countryCode) {
    this.restService.forecast(cityId, countryCode, 5)
      .subscribe(data => {
        this.forecast = data['list'];
        this.citiesList = [];
        this.citiesList.push(data['city']);
      })
  }

  getGeoForecast(lat, lon) {
    this.restService.geoForecast(lat, lon, 5)
    .subscribe(data => {
      this.forecast = data['list']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
  }

}
