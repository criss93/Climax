import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCityPage } from './select-city';

@NgModule({
  declarations: [
    SelectCityPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCityPage),
  ],
})
export class SelectCityPageModule {}
