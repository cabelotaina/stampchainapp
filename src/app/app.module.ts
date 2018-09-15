import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
 
import { MyApp } from './app.component';

import { ControlPage } from '../pages/control/control';
import { PointsPage } from '../pages/points/points';
import { SettingsPage } from '../pages/settings/settings';
import { LocationTracker } from '../providers/location-tracker/location-tracker';
import { CalendarPage }  from '../pages/calendar/calendar';
import { AddCompanyPage }  from '../pages/add-company/add-company';
import { HomePage }  from '../pages/home/home';
import { ListCompanyPage } from '../pages/list-company/list-company';
import { Page1 } from '../pages/tabs/page1';
import { Page2 } from '../pages/tabs/page2';
import { Page3 } from '../pages/tabs/page3';
import { Page4 } from '../pages/tabs/page4';


import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { PointProvider } from '../providers/point/point';

import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';

//import { CalendarModule } from 'ionic3-calendar';

@NgModule({
  declarations: [
    MyApp,
    ControlPage,
    PointsPage,
    SettingsPage,
    CalendarPage,
    AddCompanyPage,
    HomePage,
    ListCompanyPage,
    Page1,
    Page2,
    Page3,
    Page4
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    //CalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ControlPage,
    PointsPage,
    SettingsPage,
    CalendarPage,
    AddCompanyPage,
    HomePage,
    ListCompanyPage,
    Page1,
    Page2,
    Page3,
    Page4
  ],
  providers: [
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PointProvider,
    DatePipe,
  ]
})
export class AppModule {}