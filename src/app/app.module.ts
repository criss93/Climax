import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


import { MyApp } from './app.component';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { StorageProvider } from '../providers/storage/storage';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
    PipesModule,
    Geolocation,
    StorageProvider,
    GoogleMapsProvider,
    SQLite,
    DatabaseProvider,
  ]
})
export class AppModule {}
