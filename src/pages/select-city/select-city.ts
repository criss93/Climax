import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectCityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-city',
  templateUrl: 'select-city.html',
})
export class SelectCityPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToPage(pageName: string) {
    this.navCtrl.push(pageName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCityPage');
  }

}
