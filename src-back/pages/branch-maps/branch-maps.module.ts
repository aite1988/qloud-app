import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchMapsPage } from './branch-maps';

@NgModule({
  declarations: [
    BranchMapsPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchMapsPage),
  ],
})
export class BranchMapsPageModule {}
