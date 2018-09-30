import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class UserProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(user: User) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('New user: '+JSON.stringify(user, null, 1));
        let sql = 'insert into users (password, wallet, seed) values (?, ?, ?)';
        let data = [user.password, user.wallet, user.seed];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public update(user: User) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update users set password = ?, wallet = ?, seed = ?';
        let data = [user.password, user.wallet, user.seed];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from users where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from users where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let user = new User();
              user.id = item.id;
              user.password = item.password;
              user.wallet = item.wallet;
              user.seed = item.seed;

              return user;
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
        let sql = 'SELECT * from users';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let users: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var user = data.rows.item(i);
                users.push(user);
              }
              return users;
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
        let sql = 'DELETE FROM users; VACUUM;';

        return db.executeSql(sql)
          .catch((e) => console.error(JSON.stringify(e, null, 1)));
      })
      .catch((e) => console.error(JSON.stringify(e, null, 1)));
  }
}

export class User {
  id: Number;
  password: String;
  wallet: String;
  seed: String;
}
