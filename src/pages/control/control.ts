import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { PointProvider } from '../../providers/point/point';

@Component({
  selector: 'page-control',
  templateUrl: 'control.html'
})
export class ControlPage {
 
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker,
    private pointProvider: PointProvider) {
 
  }

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }

  reset(){
    this.pointProvider.reset();
  }
 
}