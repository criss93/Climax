import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
