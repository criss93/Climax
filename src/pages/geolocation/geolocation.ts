import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  lat: number;
  lon: number;
  forecastDisabled: boolean;
  fromMap = true;
  byGeo = true;
  cityName: string = '';
  countryCode: string = '';

  constructor(public navCtrl: NavController, private zone: NgZone, private maps: GoogleMapsProvider, private viewCtrl: ViewController) {
    this.searchDisabled = true;
    this.saveDisabled = true;
    this.forecastDisabled = true;

  }

  ionViewDidLoad(): void {

    let mapLoaded = this.maps.initMap(this.mapElement.nativeElement).then(() => {

      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.maps.map);
      this.searchDisabled = false;

      this.maps.map.addListener('click', (event) => {

        this.lat = event.latLng.lat();
        this.lon = event.latLng.lng();
        this.forecastDisabled = false;
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, result => {
          this.placesService.getDetails({ placeId: result[0].place_id }, (details) => {
            for (let i = 0; i < details.address_components.length; i++) {
              let addressType = details.address_components[i].types[0];
              if (addressType == "locality") {
                this.cityName = details.address_components[i].long_name;
              }
            }
            for (let i = 0; i < details.address_components.length; i++) {
              let addressType = details.address_components[i].types[0];
              if (addressType == "country") {
                this.countryCode = details.address_components[i].short_name;
              }
            }
            if (this.countryCode != '' && this.cityName != '') {
              this.saveDisabled = false;

            }
          });
        })
      })
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

        this.forecastDisabled = false;

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
    this.viewCtrl.dismiss({ name: this.cityName, country: this.countryCode });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  viewForecast() {
    let location = {
      lat: this.lat,
      lon: this.lon,
    }
    this.navCtrl.push('ForecastPage', { citiesList: location, map: this.fromMap, geo: this.byGeo })
  }

}
