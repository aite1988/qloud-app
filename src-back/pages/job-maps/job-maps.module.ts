import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobMapsPage } from './job-maps';

@NgModule({
  declarations: [
    JobMapsPage,
  ],
  imports: [
    IonicPageModule.forChild(JobMapsPage),
  ],
})
export class JobMapsPageModule {}
