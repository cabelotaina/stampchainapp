import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PointProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(point: Point) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('Point Service: '+JSON.stringify(point, null, 1));
        let sql = 'insert into points (timestamp, latitude, longitude) values (?, ?, ?)';
        let data = [point.timestamp, point.latitude, point.longitude];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(point: Point) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update points set timestamp = ?, latitude = ?, longitude = ?';
        let data = [point.timestamp, point.latitude, point.longitude];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from points where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
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

              return point;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
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
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }


  public reset() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'DELETE FROM points; VACUUM;';

        return db.executeSql(sql)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public save() {
    
  }
}

export class Point {
  id: Number;
  timestamp: Number;
  latitude: Number;
  longitude: Number;
}
