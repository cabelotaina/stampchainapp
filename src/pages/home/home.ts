import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { ControlPage } from '../../pages/control/control';
import { PointsPage } from '../../pages/points/points';
import { SettingsPage } from '../../pages/settings/settings';
import { AddCompanyPage } from '../../pages/add-company/add-company';
import { CalendarPage } from '../../pages/calendar/calendar';
import { ListCompanyPage } from '../../pages/list-company/list-company';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Nav) nav: Nav;
 	public calendar;
  constructor() {
 	  this.calendar = CalendarPage
  }

  goTo(page){
  	console.log(page)
  	this.nav.setRoot(page);
  }
}