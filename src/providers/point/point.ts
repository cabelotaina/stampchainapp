import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PointProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(point: Point) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('Formated date: '+new Date());
        console.log('New point: '+JSON.stringify(point, null, 1));
        let sql = 'insert into points (timestamp, latitude, longitude, type) values (?, ?, ?, ?)';
        let data = [point.timestamp, point.latitude, point.longitude, point.type];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public update(point: Point) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update points set timestamp = ?, latitude = ?, longitude = ?, type = ?';
        let data = [point.timestamp, point.latitude, point.longitude, point.type];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from points where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from points where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let point = new Point();
              point.id = item.id;
              point.timestamp = item.timestamp;
              point.latitude = item.latitude;
              point.longitude = item.longitude;
              point.type = item.type;

              return point;
            }

            return null;
          })
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from points';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let points: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var point = data.rows.item(i);
                points.push(point);
              }
              return points;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }


  public reset() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM points; VACUUM;';

        return db.executeSql(sql)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }


  /**
  * https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
  * Calculates the haversine distance between point A, and B.
  * @param {number[]} latlngA [lat, lng] point A
  * @param {number[]} latlngB [lat, lng] point B
  * @param {boolean} isMiles If we are using miles, else km.
  */

  public haversineDistance(latlngA, latlngB, isMiles) {
    const squared = x => x * x;
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // Earth’s mean radius in km

    const dLat = toRad(latlngB[0] - latlngA[0]);
    const dLon = toRad(latlngB[1] - latlngA[1]);

    const dLatSin = squared(Math.sin(dLat / 2));
    const dLonSin = squared(Math.sin(dLon / 2));

    const a = dLatSin +
              (Math.cos(toRad(latlngA[0])) * Math.cos(toRad(latlngB[0])) * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    if (isMiles) distance /= 1.609344;

    return distance;
  }

  public save() {
    
  }
}

export class Point {
  id: Number;
  timestamp: Number;
  latitude: Number;
  longitude: Number;
  type: String;
}
