import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
// import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  localWeather = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private restService: RestServiceProvider) {
    this.getLocalWeather();
  }

  getLocalWeather() {
    try {
      this.restService.localWeather().subscribe(data => {
        this.localWeather = Array.of(data);
      })
      
    } catch (e) {
      console.log(e);
    }
  }
  

  viewForecast(citiesList) {
    this.navCtrl.push('ForecastPage', {citiesList : citiesList})
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  // ionViewWillLoad(){
  //   this.afAuth.authState.subscribe(data => {
  //     if (data.email && data.uid){
  //     this.toast.create({
  //       message: `Bienvenido a Climax ${data.email}`,
  //       duration: 3000
  //     }).present();
  //   } else {
  //     this.toast.create({
  //       message: `Algo pasó...`,
  //       duration: 3000
  //     }).present();
  //   }
  //   });
  // }

}
