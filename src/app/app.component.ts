import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ViewController } from 'ionic-angular';

import { ControlPage } from '../pages/control/control';
import { PointsPage } from '../pages/points/points';
import { SettingsPage } from '../pages/settings/settings';
import { AddCompanyPage } from '../pages/add-company/add-company';
import { CalendarPage } from '../pages/calendar/calendar';
import { HomePage } from '../pages/home/home';
import { ListCompanyPage } from '../pages/list-company/list-company';
import { DatabaseProvider } from '../providers/database/database'
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocationTracker } from '../providers/location-tracker/location-tracker';
import { AddWalletPage } from '../pages/add-wallet/add-wallet';
import {} from '../pages/report/report'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  devPages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar,
   dbProvider: DatabaseProvider, locationTracker: LocationTracker,
    backgroundMode: BackgroundMode, private splashScreen: SplashScreen) {

    splashScreen.show();
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // backgroundMode.enable();
 
      //Criando o banco de dados // teste if db is already open
      dbProvider.createDatabase()
        .then(() => {
          splashScreen.hide();
          // if(this.nav.getActive().name === 'HomePage'){
          //   this.isOuthome = false;
          // } else {
          //    this.isOuthome = true;
          // }
          locationTracker.startTracking();
        })
        .catch(() => {
          splashScreen.hide();
          // console.log(this.nav.isActive("HomePage"));
          locationTracker.startTracking();
        });
    });

    // se tem wallet remover adicionar carteira... (será?)

    this.pages = [
      { title: 'Principal', component: HomePage },
      { title: 'Relatório', component: CalendarPage },
      { title: 'Configurações', component: SettingsPage },
      { title: 'Listar Empresas', component: ListCompanyPage },
      { title: 'Adicionar Empresa', component: AddCompanyPage },
      { title: 'Adicionar Carteira', component: AddWalletPage },

      // { title: 'Login', component: LoginPage },
      // { title: 'Register', component: RegisterPage }
    ];

    this.devPages = [
      { title: 'Controles', component: ControlPage },
      { title: 'Pontos', component: PointsPage },
    ];
  }

  ionViewCanEnter(){
    console.log('voltei');
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome(){
    this.nav.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
  }

}

