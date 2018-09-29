import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import {CalendarPage} from '../../pages/calendar/calendar'
import {SettingsPage} from '../../pages/settings/settings'
import {ListCompanyPage} from '../../pages/list-company/list-company'
import {AddCompanyPage} from '../../pages/add-company/add-company'
import {AddWalletPage} from '../../pages/add-wallet/add-wallet'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public web3: any;
  public calendar; settings; list_company; add_company; add_wallet;
  public nav;

  constructor(nav: NavController){
    this.calendar = CalendarPage;
    this.nav = nav;
    this.settings = SettingsPage;
    this.list_company = ListCompanyPage;
    this.add_company = AddCompanyPage;
    this.add_wallet = AddWalletPage;

  }

  goTo(page){
  	console.log(page);
  	this.nav.setRoot(page);
  }
}