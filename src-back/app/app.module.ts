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
import { PhotoUploadEditPage } from '../pages/job-detail-photo/photo-upload-edit/photo-upload-edit';
import { PhotoDrawPage } from '../pages/job-detail-photo/photo-draw/photo-draw';
import { PhotoEditPage } from '../pages/photo-edit/photo-edit';
import { JobDetailPage } from '../pages/job-detail/job-detail';
import { JobDetailAddMorePage } from '../pages/job-detail-addmore/job-detail-addmore';
import { JobDetailPhotoPage } from '../pages/job-detail-photo/job-detail-photo';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { ConfirmExit } from '../providers/confirm-exit';
import {HttpModule} from '@angular/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { Badge } from '@ionic-native/badge';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { FCM } from '@ionic-native/fcm';
import { DatePickerModule } from 'ionic3-datepicker';

import { ComponentsModule } from './../components/components.module';

import { IonRefreshNativeModule } from '@ionic-native/ion-refresh-native';
import { cryptTS } from './../providers/api-service/crypt/crypt';



//ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"

//npm install --save @ionic-native/geolocation@4

//ionic cordova plugin add cordova-plugin-background-mode
//npm install --save @ionic-native/background-mode@4

@NgModule({
  declarations: [
    MyApp,TabsPage,JobListPage,ProfilePage,LoginPage,JobHistoryListPage,PhotoEditPage,HomePage
   ,JobDetailPhotoPage,PhotoUploadEditPage,JobDetailPage
    ,PhotoDrawPage,JobDetailAddMorePage
  ],
  imports: [
    ComponentsModule,
    IonRefreshNativeModule,
    BrowserModule,
    HttpModule,
    DatePickerModule,
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
    IonicModule.forRoot(MyApp,{tabsHideOnSubPages: true
    , backButtonText: '',
    iconMode: 'ios',
    //mode:'ios',
    activator:'ripple',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabsPlacement: 'bottom',
    pageTransition: 'ios-transition',
    pageTransitionDelay:'0',
    tabsHighlight:true,
    tabsLayout:'icon-top'})
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,TabsPage,JobListPage,ProfilePage,LoginPage,JobHistoryListPage,PhotoEditPage,HomePage,JobDetailPhotoPage,
    PhotoUploadEditPage,JobDetailPage,PhotoDrawPage,JobDetailAddMorePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BackgroundMode,
    Camera,
    FCM,
    Badge,
    CallNumber,
    InAppBrowser,
    ConfirmExit,
    ApiServiceProvider,
    cryptTS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
