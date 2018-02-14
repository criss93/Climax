import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html',
})
export class SelectCityPage {

  citiesList: any[] = [];
  sortedCL: any[] = [];
  deleteDisabled = false;
  exists = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private modCtrl: ModalController) {
  }

  ionViewWillLoad() {
    this.getStoredCities();
  }
  ionViewWillLeave() {
    this.getStoredCities();
  }

  sortByCityName(array) {
    return array.sort((a, b) => {
      let x = a['name']; let y = b['name'];
      return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  addCity() {
    let addWeatherModal = this.modCtrl.create('AddCityPage');
    addWeatherModal.onWillDismiss((data) => {
      if (data) {
        this.database.addCity(data.city, data.country);
        this.getStoredCities();
      }
    });
    addWeatherModal.present();
  }

  deleteCity(city) {
    this.database.deleteCity(city);
    this.getStoredCities();
  }

  getStoredCities() {
    this.database.getCities().then(data => {
      this.citiesList = data
      this.citiesList.sort();
    }).catch((error) => {
      console.log(error);
    });
  }

  refresh() {
    this.getStoredCities();
  }

  navigateToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  viewForecast(citiesList) {
    this.navCtrl.push('ForecastPage', { citiesList: citiesList })
  }

}
