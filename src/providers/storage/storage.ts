//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
   
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
}
