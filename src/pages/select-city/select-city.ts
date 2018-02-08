import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { StorageProvider} from '../../providers/storage/storage';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html',
})
export class SelectCityPage {

  citiesList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: StorageProvider , private restService: RestServiceProvider, private modCtrl: ModalController) {
    this.getStoredWeather();
  }

  addWeather() {
    let addWeatherModal = this.modCtrl.create('AddCityPage');
    addWeatherModal.onWillDismiss((data) => {
      if (data) {
        this.getWeather(data.city, data.country);

      }
    });
    addWeatherModal.present();
  }

  getStoredWeather() {
    this.storage.getData().then(cities => {
      this.citiesList = JSON.parse(cities) || [];
    })
  }

  navigateToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  getWeather(city: string, country: string) {
    try {
      this.restService.cityWeather(city, country)
      .subscribe(data => {
        this.citiesList.push(data);
        this.storage.setData(data);
      })
      
    } catch (e) {
      console.log(e);
    }
  }

  viewForecast(citiesList) {
    this.navCtrl.push('ForecastPage', {citiesList : citiesList})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCityPage');
  }

}
