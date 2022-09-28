import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupJobdetailPage } from './popup-jobdetail';
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    PopupJobdetailPage
  ],
  imports: [
    IonicPageModule.forChild(PopupJobdetailPage),ComponentsModule
  ],
})
export class PopupJobdetailPageModule {}
