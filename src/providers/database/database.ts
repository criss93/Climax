import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform } from 'ionic-angular';


@Injectable()
export class DatabaseProvider {

  db: SQLiteObject;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'myDatabase.db',
        location: 'default'
      }).then((db:SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS cities(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, country TEXT)', {});
        this.db = db;
      })
    })
    // this.platform.ready().then(() => {
    //   this.sqlite.create({
    //     name: 'todos.db',
    //     location: 'default'
    //   })
    //     .then((db: SQLiteObject) => {
    //       db.executeSql('CREATE TABLE IF NOT EXISTS cities(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, country TEXT)', {})
    //         .then(() => console.log('Executed SQL'))
    //         .catch(e => console.log(e));
    //       this.db = db;
    //     }).catch(e => console.log(e));
    // });
  }

  addCity(name: string, country: string) {
    let sqlite = 'INSERT INTO cities(name, country) VALUES (?,?)';
    return this.db.executeSql(sqlite, [name, country]);
  }


  getCities() {
    let sqlite = 'SELECT * FROM cities';
    return this.db.executeSql(sqlite, [])
      .then((data) => {
        let cities = [];
        for (let index = 0; index < data.rows.length; index++) {
          cities.push(data.rows.item(index));
        }
        return cities;
      })

  }

  deleteCity(city: any) {
    let sqlite = 'DELETE FROM cities WHERE id=?';
    return this.db.executeSql(sqlite, [city.id])
  }
}
