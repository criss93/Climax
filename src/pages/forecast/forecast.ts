import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private restService: RestServiceProvider) {
    this.isMap = navParams.get('map');
    this.byGeo = navParams.get('geo');
    try {
      if (this.isMap === true) {
        if (this.byGeo === false) {
          this.citiesList = navParams.get('citiesList');
          this.countryCode = navParams.get('countryAux');
          this.getForecast(this.citiesList.name, this.countryCode)
        } else {
          this.citiesList = navParams.get('citiesList');
          this.getGeoForecast(this.citiesList.lat, this.citiesList.lon);
        }
      } else {
        this.citiesList = navParams.get('citiesList');
        this.getForecast(this.citiesList.name, this.citiesList.country)
      }
    } catch (e) {
      console.log(e);
    }
  }

  getForecast(city, countryCode) {
    this.restService.forecast(city, countryCode)
      .subscribe(data => {
        this.forecast = data['list'];
      })
  }

  getGeoForecast(lat, lon) {
    this.restService.geoForecast(lat, lon)
      .subscribe(data => {
        this.forecast = data['list']
      })
  }

  showDetails(city) {

    let alert = this.alertCtrl.create({
      title: 'Forecast Details',
      subTitle: `Pressure: ${city.main.pressure}hPa,
        Humidity: ${city.main.humidity}%,
        Description: ${city.weather[0].description},
        Wind Speed: ${city.wind.speed}m/s,
        Wind direction: ${city.wind.deg}°`,
      buttons: ['OK']
    });
    alert.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
  }

}
