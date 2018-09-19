import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ControlPage } from '../pages/control/control';
import { PointsPage } from '../pages/points/points';
import { SettingsPage } from '../pages/settings/settings';
import { AddCompanyPage } from '../pages/add-company/add-company';
import { CalendarPage } from '../pages/calendar/calendar';
import { HomePage } from '../pages/home/home';
import { ListCompanyPage } from '../pages/list-company/list-company';
import { DatabaseProvider } from '../providers/database/database'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  devPages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
 
      //Criando o banco de dados
      dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          splashScreen.hide();
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          splashScreen.hide();
        });
    });

    this.pages = [
      { title: 'Principal', component: HomePage },
      { title: 'Relatório', component: CalendarPage },
      { title: 'Configurações', component: SettingsPage },
      { title: 'Listar Empresas', component: ListCompanyPage },
      { title: 'Adicionar Empresa', component: AddCompanyPage },

      // { title: 'Login', component: LoginPage },
      // { title: 'Register', component: RegisterPage }
    ];

    this.devPages = [
      { title: 'Controles', component: ControlPage },
      { title: 'Pontos', component: PointsPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

