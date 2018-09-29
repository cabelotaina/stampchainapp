import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
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

		// var lastUpdateTime, minFrequency = 60000;
	 
	 //  // Background Tracking
	 
		// const config: BackgroundGeolocationConfig = {
  //           desiredAccuracy: 0,
  //           stationaryRadius: 0,
  //           distanceFilter: 0,
  //           startOnBoot: true, // android only
  //           pauseLocationUpdates: false,
  //           debug: true, //  enable this hear sounds for background-geolocation life-cycle.
  //           stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  //           url: 'https://webhook.site/31d5edf7-b917-4868-9138-f06c452f1b48',
  //           // saveBatteryOnBackground: true
  //   };

	 
	 //  this.backgroundGeolocation.configure(config)
	 //  .subscribe((location: BackgroundGeolocationResponse) => {
	 
	 //    console.log('BackgroundGeolocation:  ' + JSON.stringify(location, null, 1));

		// 	var now = new Date();  //https://stackoverflow.com/questions/35294154/cordova-geolocation-watchposition-frequency-is-higher-than-the-options-allow-it
	 //    if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
	 //        console.log("Ignoring position update");
	 //        return;
	 //    }
	 //    lastUpdateTime = now;
	 
	 //    // Run update inside of Angular's zone
	 //    this.zone.run(() => {
	 //    	this.point = new Point();
	 //    	this.point.timestamp = Date.now();
	 //      this.point.latitude = this.lat = location.latitude;
	 //      this.point.longitude = this.lng = location.longitude;
	 //      this.point.type = 'Background';

	 //      this.pointProvider.insert(this.point);
	 //      this.backgroundGeolocation.finish();
	 //      // this.backgroundGeolocation.start();
	 //    });
	 
	 //  }, (err) => {
	 
	 //    console.log(err);
	 
	 //  });
	 
	 //  // Turn ON the background-geolocation system.
	 //  this.backgroundGeolocation.start();
	 
	 //  // Foreground Tracking
	 
		// let options = {
		//   frequency: 60000, 
		//   enableHighAccuracy: true,
		// };

		

		 
		// this.watch = this.geolocation.watchPosition(options)
		// .filter((p: any) => p.code === undefined)
		// .subscribe((position: Geoposition) => {
		 
		// 	var now = new Date();  //https://stackoverflow.com/questions/35294154/cordova-geolocation-watchposition-frequency-is-higher-than-the-options-allow-it
	 //    if(lastUpdateTime && now.getTime() - lastUpdateTime.getTime() < minFrequency){
	 //        console.log("Ignoring position update");
	 //        return;
	 //    }
	 //    lastUpdateTime = now;
		 
		//   this.zone.run(() => {
		//   	this.point = new Point();
		//   	this.point.timestamp = Date.now();
	 //      this.point.latitude = this.lat = position.coords.latitude;
	 //      this.point.longitude = this.lng = position.coords.longitude;
	 //      this.point.type = 'Foreground'
	 //      this.pointProvider.insert(this.point);
		//   });
		 
		// });
	 
	}
 
	stopTracking() {
	 
	  console.log('stopTracking');
	 
	  this.backgroundGeolocation.finish();
	  this.watch.unsubscribe();
	 
	}


}