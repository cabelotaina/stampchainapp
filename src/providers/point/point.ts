import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
/*
  Generated class for the PointProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PointProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public reset(){
    this.storage.clear();
  }

  public insert(point: Point) {

    let key = Date.now().toString();;

    console.log(key);
    console.log(point);

    return this.save(key, point);
  }

  private save(key: string, point: Point) {
    return this.storage.set(key, point);
  }

  public getAll() {

    let points: PointList[] = [];

    return this.storage.forEach((value: Point, key: string, iterationNumber: Number) => {
      let point = new PointList();
      point.key = key;
      point.point = value;
      points.push(point);
    })
      .then(() => {
      	console.log(points)
        return Promise.resolve(points);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

}

export class Point {
  latitude: number;
  longitude: number;
}

export class PointList {
  key: string;
  point: Point;
}