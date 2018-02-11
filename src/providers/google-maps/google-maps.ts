import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  map: any;

  constructor(private geolocation: Geolocation) {

  }

  initMap(mapElement: any): Promise<any>{

    this.mapElement = mapElement;

    return new Promise(resolve => {

      this.geolocation.getCurrentPosition().then(position => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let options = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, options);
        resolve(true);

      });

    });

  }
}

