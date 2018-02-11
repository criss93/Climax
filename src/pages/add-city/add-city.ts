import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddCityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-city',
  templateUrl: 'add-city.html',
})
export class AddCityPage {

  data = {
    city: '',
    country: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  dismiss(data) {
    this.view.dismiss(data);
  }

  watchForecast(data) {
    this.navCtrl.push('ForecastPage', data)
  }

}
