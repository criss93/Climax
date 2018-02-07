import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCityPage } from './select-city';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    SelectCityPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCityPage),
    PipesModule
  ],
})
export class SelectCityPageModule {}
