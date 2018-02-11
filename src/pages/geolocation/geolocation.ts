import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {

  @ViewChild('map') mapElement: ElementRef;

  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;

  constructor(public navCtrl: NavController, private zone: NgZone, private maps: GoogleMapsProvider, private viewCtrl: ViewController) {
    this.searchDisabled = true;
    this.saveDisabled = true;

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
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {

      this.zone.run(() => {

        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;

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
    this.viewCtrl.dismiss(this.location);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  // map: any;
  // location: any;
  // autocompleteService: any;
  // placesService: any;
  // query: string = '';
  // places: any = [];

  // constructor(private geolocation: Geolocation, private zone: NgZone, private viewCtrl: ViewController) {
  //   this.displayMap();
  // }

  // displayMap() {

  //   this.geolocation.getCurrentPosition().then(resp => {
  //     const location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

  //     const options = {
  //       center: location,
  //       zoom: 15,
  //       streetViewControl: false,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     };

  //     this.map = new google.maps.Map(document.querySelector('#map'), options);
  //     this.autocompleteService = new google.maps.places.AutocompleteService();
  //     this.placesService = new google.maps.places.PlacesService(this.map.map);

  //     this.map.addListener('click', (event) => {
  //       console.log(event.latLng.lat())
  //       console.log(event.latLng.lng())
  //     });

  //   }).catch((error) => {
  //     console.log(error);
  //   });

  // }

}
