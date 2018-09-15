import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Page1} from '../tabs/page1';
import {Page2} from '../tabs/page2';
import {Page3} from '../tabs/page3';
import {Page4} from '../tabs/page4';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  tab1Root = Page1;
  tab2Root = Page2;
  tab3Root = Page3;
  tab4Root = Page4;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  public onDaySelect(day){
  	console.log(day);
  }

}
