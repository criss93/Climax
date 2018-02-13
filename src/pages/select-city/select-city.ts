import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { StorageProvider } from '../../providers/storage/storage';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html',
})
export class SelectCityPage {

  citiesList: any[] = [];
  sortedCL: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private storage: StorageProvider, private restService: RestServiceProvider, private modCtrl: ModalController) {
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
        console.log(data);
        this.database.addCity(data.city, data.country);
        this.getStoredCities();
        // this.citiesList.push(data);
        // this.storage.setData(this.citiesList);
        // this.getCities(data.city, data.country);

      }
    });
    addWeatherModal.present();
  }

  getStoredCities() {
    this.database.getCities().then(data => {
      this.citiesList = data
      this.sortedCL = this.sortByCityName(this.citiesList);
    }).catch((error) => {
      console.log(error);
    });
    // return this.database.getCities().then((data) => {
    //   let list: Array<Cities> = [];
    //   if (data) {
    //     for(let city of data) {
    //       list.push(new city(city.name, city.country))
    //     }
    //     this.citiesList = list;
    //   }
    // });
    // this.storage.getData().then(cities => {
    //   this.citiesList = JSON.parse(cities) || [];
    //   // this.citiesList = cities;
    // })
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
