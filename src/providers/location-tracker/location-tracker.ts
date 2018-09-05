import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

import { Point, PointProvider } from '../../providers/point/point';

 
@Injectable()
export class LocationTracker {

	public point: Point;
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
 
  constructor(public zone: NgZone, private backgroundGeolocation: BackgroundGeolocation,
  	private geolocation: Geolocation, private pointProvider: PointProvider) {
 
  }
 
	startTracking() {
	 
	  // Background Tracking
	 
	  let config = {
	    desiredAccuracy: 0,
	    stationaryRadius: 20,
	    distanceFilter: 10,
	    debug: true,
	    interval: 2000
	  };
	 
	  this.backgroundGeolocation.configure(config).subscribe((location) => {
	 
	    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
	 
	    // Run update inside of Angular's zone
	    this.zone.run(() => {
	    	this.point = new Point();
	      this.point.latitude = this.lat = location.latitude;
	      this.point.longitude = this.lng = location.longitude;

	      this.pointProvider.insert(this.point);
	    });
	 
	  }, (err) => {
	 
	    console.log(err);
	 
	  });
	 
	  // Turn ON the background-geolocation system.
	  this.backgroundGeolocation.start();
	 
	 
	  // Foreground Tracking
	 
		let options = {
		  frequency: 3000,
		  enableHighAccuracy: true
		};
		 
		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
		 
		  console.log(position);
		 
		  // Run update inside of Angular's zone
		  this.zone.run(() => {
		  	this.point = new Point();
	      this.point.latitude = this.lat = position.coords.latitude;
	      this.point.longitude = this.lng = position.coords.longitude;

	      this.pointProvider.insert(this.point);
		  });
		 
		});
	 
	}
 
	stopTracking() {
	 
	  console.log('stopTracking');
	 
	  this.backgroundGeolocation.finish();
	  this.watch.unsubscribe();
	 
	}
 
}