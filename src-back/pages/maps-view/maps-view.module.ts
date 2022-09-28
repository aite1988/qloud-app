import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsViewPage } from './maps-view';

@NgModule({
  declarations: [
    MapsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsViewPage),
  ],
})
export class MapsViewPageModule {}
