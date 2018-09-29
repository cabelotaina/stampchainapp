import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';
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

import { BackgroundMode } from '@ionic-native/background-mode';

// problemas para criar o update company
// vou ter que colocar o endereço com company.addresses = JSON.stringify(addresses)
// recuperar com company.addresses = JSON.parse(addresses)
// import { UpdateCompanyPage } from '../pages/update-company/update-company';


import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { PointProvider } from '../providers/point/point';

import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { CompanyProvider } from '../providers/company/company';

import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { AddressProvider } from '../providers/address/address';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BlockchainProvider } from '../providers/blockchain/blockchain';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AddWalletPage } from '../pages/add-wallet/add-wallet';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt);


//import { CalendarModule } from 'ionic3-calendar';

@NgModule({
  declarations: [
    MyApp,
    ControlPage,
    PointsPage,
    SettingsPage,
    AddCompanyPage,
    HomePage,
    ListCompanyPage,
    Page1,
    Page2,
    Page3,
    Page4,
    CalendarPage,
    AddWalletPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ControlPage,
    PointsPage,
    SettingsPage,
    AddCompanyPage,
    HomePage,
    ListCompanyPage,
    Page1,
    Page2,
    Page3,
    Page4,
    CalendarPage,
    AddWalletPage,
  ],
  providers: [
    ToastController,
    SplashScreen,
    BackgroundMode,
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    StatusBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PointProvider,
    DatePipe,
    CompanyProvider,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    SQLite,
    DatabaseProvider,
    AddressProvider,
    BlockchainProvider
  ]
})
export class AppModule {}