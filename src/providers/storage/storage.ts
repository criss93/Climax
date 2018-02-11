//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  // public cities: Array<Object>;
  // public cities: Array<any>;
 
  // public cities: Array<Object>;

  constructor(private storage: Storage) {
    // this.getData().then(data => {
    //   this.cities = JSON.parse(data);
      // this.cities = data;
    // })
  }

  setCounter(counter) {
    this.storage.set('counter', counter)
  }

  getCounter(){
    return this.storage.get('counter')
  }

  clearStorage() {
    this.storage.clear();
  } 

  // setDataTest(citiesList) {
  //   if(!this.cities){
  //     this.cities = citiesList;
  //   } else {
  //     this.cities.push(citiesList);
  //   }

  //   this.storage.set('listOfCities', JSON.stringify(this.cities));
  // }

  // getDataTest() {
  //   return this.storage.get('listOfCities');
  // }

  // setData(citiesList) {
  //   if(!this.cities){
  //     this.cities = citiesList;
  //   } else {
  //     this.cities.push(citiesList);
  //   }

  //   this.storage.set('listOfCities', this.cities);
  // }

  // setData(ciudades) {
  //   if(!this.cities){
  //     this.cities = [ciudades]
  //   } else {
  //     this.cities.push(ciudades)
  //   }

  //   this.storage.set('ciudades', JSON.stringify(this.cities));
  // }

  // getData() {
  //   return this.storage.get('ciudades');
  // }

}
