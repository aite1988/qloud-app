import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { JobListPage } from '../pages/job-list/job-list';
import { JobHistoryListPage } from '../pages/job-history-list/job-history-list';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { PhotoEditPage } from '../pages/photo-edit/photo-edit';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import {HttpModule} from '@angular/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AngularCropperjsModule } from 'angular-cropperjs';

import { FCM } from '@ionic-native/fcm';
//ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"

//npm install --save @ionic-native/geolocation@4

//ionic cordova plugin add cordova-plugin-background-mode
//npm install --save @ionic-native/background-mode@4

@NgModule({
  declarations: [
    MyApp,TabsPage,JobListPage,ProfilePage,LoginPage,JobHistoryListPage,PhotoEditPage,HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularCropperjsModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,TabsPage,JobListPage,ProfilePage,LoginPage,JobHistoryListPage,PhotoEditPage,HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BackgroundMode,
    Camera,
    FCM,
    ApiServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
