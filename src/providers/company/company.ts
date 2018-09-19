import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class CompanyProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(company: Company) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        console.log('Company Service: '+JSON.stringify(company, null, 1));
        let sql = 'insert into companies (name, goJob, outJob, isMyActualJob) values (?, ?, ?, ?)';
        let data = [company.name, company.goJob, company.outJob, company.isMyActualJob];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(company: Company) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update companies set name = ?, in = ?, outJob = ?, isMyActualJob = ?';
        let data = [company.name, company.goJob, company.outJob, company.isMyActualJob];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from companies where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from companies where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let company = new Company();
              company.id = item.id;
              company.name = item.name;
              company.goJob = item.goJob;
              company.outJob = item.outJob;
              company.isMyActualJob = item.isMyActualJob;

              return company;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAll(name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * from companies';
        var data: any[];

        // filtrando pelo nome
        if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let companys: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var company = data.rows.item(i);
                companys.push(company);
              }
              return companys;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}

export class Company {
	id: Number;
  name: String;
  goJob: String;
  outJob: String;
  isMyActualJob: Boolean;
}