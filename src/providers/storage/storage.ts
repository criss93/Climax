//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  // public cities: Array<Object>;
  public cities: Array<any>;

  constructor(private storage: Storage) {
    this.getData().then(data => {
      this.cities = JSON.parse(data);
    })
  }

  clearStorage() {
    this.storage.clear();
  }

  setData(ciudades) {
    if(!this.cities){
      this.cities = [ciudades]
    } else {
      this.cities.push(ciudades)
    }

    this.storage.set('ciudades', JSON.stringify(this.cities));
  }

  getData() {
    return this.storage.get('ciudades');
  }

  setCounter(counter) {
    this.storage.set('counter', counter)
  }

  getCounter(){
    return this.storage.get('counter')
  }

}