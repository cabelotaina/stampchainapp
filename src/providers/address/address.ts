import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class AddressProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(address: Address) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into addresses (description, latitude, longitude) values (?, ?, ?)';
        let data = [address.description, address.latitude, address.longitude];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(address: Address) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update adresses set description = ?, in = ?, longitude = ?';
        let data = [address.description, address.latitude, address.longitude];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from adresses where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from adresses where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let address = new Address();
              address.id = item.id;
              address.description = item.description;
              address.latitude = item.latitude;
              address.longitude = item.longitude;

              return address;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(description: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from adresses';
        var data: any[];

        // filtrando pelo nome
        if (description) {
          sql += ' and p.description like ?'
          data.push('%' + description + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let addresss: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var address = data.rows.item(i);
                addresss.push(address);
              }
              return addresss;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Address {
  id: Number;
  description: String;
  latitude: Number;
  longitude: Number;
  company_id: Number;
}
