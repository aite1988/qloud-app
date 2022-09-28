import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardCustomPage } from './card-custom';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    CardCustomPage,
  ],
  imports: [
    IonicPageModule.forChild(CardCustomPage),LazyLoadImageModule
  ],
})
export class CardCustomPageModule {}
