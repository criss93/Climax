import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
/**
 * Generated class for the ForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {

  citiesList: any;
  forecast = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: RestServiceProvider) {
    this.citiesList = navParams.get('citiesList');
    this.getForecast(this.citiesList.name, this.citiesList.country)
  }

  getForecast(cityId, countryCode) {
    this.restService.forecast(cityId, countryCode, 5)
    .subscribe(data => {
      this.forecast = data['list'];
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
  }

}
