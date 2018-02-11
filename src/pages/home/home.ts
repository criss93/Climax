import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { StorageProvider } from '../../providers/storage/storage';
import { DatabaseProvider } from '../../providers/database/database';
// import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  localWeather = [];
  counter: number;
  aux: Array<Object>;
  name: string;
  country: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private modalCtrl: ModalController, private storage: StorageProvider, private restService: RestServiceProvider) {
    // this.storage.clearStorage();
    this.storage.getCounter().then(counter => {
      this.counter = counter + 1;
    });
    this.getLocalWeather();

  }


  getLocalWeather() {
    try {
      this.restService.localWeather()
        .subscribe(data => {
          this.localWeather = Array.of(data);
          if (this.counter == 1) {
            this.name = data.name;
            this.country = data.sys.country.toString();
            this.database.addCity(this.name, this.country);
            this.storage.setCounter(this.counter);
          } else {
            this.storage.setCounter(this.counter)
          }
        });

    } catch (e) {
      console.log(e);
    }
  }


  viewForecast(citiesList) {
    this.navCtrl.push('ForecastPage', { citiesList: citiesList })
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  navigateToGeolocationPage() {
    let modal = this.modalCtrl.create('GeolocationPage');

    modal.onDidDismiss((location) => {
      console.log(location);
    });

    modal.present();
  }

  navigateToTestPage() {

    let modal = this.modalCtrl.create('TestPage');

    modal.onDidDismiss((location) => {
      console.log(location);
    });

    modal.present();

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
