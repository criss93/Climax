import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})

export class TestPage {

  @ViewChild('map') mapElement: ElementRef;

  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  forecastDisabled: boolean;
  countryCode: string;
  fromMap = true;
  byGeo = false;

  constructor(public navCtrl: NavController, private database: DatabaseProvider, private modCtrl: ModalController, private zone: NgZone, private maps: GoogleMapsProvider, private viewCtrl: ViewController) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.forecastDisabled = true;

  }

  ionViewDidLoad(): void {

    let mapLoaded = this.maps.initMap(this.mapElement.nativeElement).then(() => {

      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

    });



  }

  selectPlace(place) {

    this.places = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name,
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {

      this.zone.run(() => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        for (let i = 0; i < details.address_components.length; i++) {
          let addressType = details.address_components[i].types[0];
          if (addressType === "country") {
            this.countryCode = details.address_components[i].short_name;
          }
        }
        this.saveDisabled = false;

        if(this.countryCode != ''){
          this.forecastDisabled = false;
        }

        this.maps.map.setCenter({ lat: location.lat, lng: location.lng });


        this.location = location;

      });

    });

  }

  searchPlace() {

    this.saveDisabled = true;

    if (this.query.length > 0 && !this.searchDisabled) {

      let config = {
        types: ['geocode'],
        input: this.query
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {

          this.places = [];

          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }

      });

    } else {
      this.places = [];
    }

  }

  save() {
    this.viewCtrl.dismiss({location: this.location, countryCode: this.countryCode});
  }

  close() {
    this.viewCtrl.dismiss();
  }

  viewForecast() {
    let location = {
      name: this.location.name
    }
    let country = this.countryCode;
    this.navCtrl.push('ForecastPage', { citiesList: location, countryAux: country, map: this.fromMap, geo: this.byGeo })
  }

  navigateToPage() {
    this.navCtrl.push('AddCityPage');
  }

  addCity() {
    let addWeatherModal = this.modCtrl.create('AddCityPage');
    addWeatherModal.onWillDismiss((data) => {
      if (data) {
        this.database.addCity(data.city, data.country);
      }
    });
    addWeatherModal.present();
  }


}
