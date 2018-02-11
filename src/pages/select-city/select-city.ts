import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { StorageProvider } from '../../providers/storage/storage';
import { DatabaseProvider } from '../../providers/database/database';
// import { Cities } from '../../models/cities.interface';s
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html',
})
export class SelectCityPage {

  // citiesList: Array<Cities>;
  // city: Cities;
  citiesList: any[] = [];

  // TestList = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private storage: StorageProvider, private restService: RestServiceProvider, private modCtrl: ModalController) {
    
    // this.getTest();
  }

  ionViewDidLoad() {
    this.getStoredCities();
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

  // getTest() {
  //   this.storage.getDataTest().then(cities => {
  //     this.TestList = JSON.parse(cities) || [];
  //   })
  // }

  getStoredCities() {
    this.database.getCities().then(data => {
      this.citiesList = data
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

  navigateToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  // getWeather(city: string, country: string) {
  //   try {
  //     this.restService.cityWeather(city, country)
  //     .subscribe(data => {
  //       this.citiesList.push(data);
  //     })

  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  viewForecast(citiesList) {
    this.navCtrl.push('ForecastPage', { citiesList: citiesList })
  }

}
