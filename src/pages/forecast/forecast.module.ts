import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForecastPage } from './forecast';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ForecastPage,
  ],
  imports: [
    IonicPageModule.forChild(ForecastPage),
    PipesModule
  ],
})
export class ForecastPageModule {}
