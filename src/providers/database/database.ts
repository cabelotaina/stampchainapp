import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  private db_config;

  constructor(private sqlite: SQLite) { }

  /**
   * Cria um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    this.db_config = {
      name: 'worker.db',
      key: '.!I<yr&{UN0OgSM;',
      location: 'default'
    }
    // delete db
    // this.sqlite.deleteDatabase(this.db_config);
    return this.sqlite.create(this.db_config);
  }

  /**
   * Cria a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Criando as tabelas
        this.createTables(db);

        // Inserindo dados padrão
        //this.insertDefaultItems(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS companies (id integer primary key AUTOINCREMENT NOT NULL, name TEXT, goJob TEXT, outJob TEXT, isMyActualJob TEXT, addresses TEXT)'],
      ['CREATE TABLE IF NOT EXISTS points (id integer primary key AUTOINCREMENT NOT NULL, timestamp TEXT, latitude TEXT, longitude TEXT, type TEXT)'],
      ['CREATE TABLE IF NOT EXISTS users (id integer primary key AUTOINCREMENT NOT NULL, password TEXT, wallet TEXT, seed TEXT)'],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from address', [])
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {

        //Criando as tabelas
        db.sqlBatch([
          ['insert into address (description, company_id) values (?, ?)', ['Servidão Aroeiras do Gramal, 650' ], [0]]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));

      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de endereços', e));
  }
}