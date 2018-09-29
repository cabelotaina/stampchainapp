import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BlockchainProvider {

	private api;
  private options

  constructor(public http: HttpClient) {
    console.log('Hello BlockchainProvider Provider');
    this.api = 'http://localhost:3000';
  }

  create(content){
  	// create seed
  	this.http.get(this.address('/seed/'+content.word))
  	.subscribe(seed => {
  		console.log(seed);
  		// preciso criar uma tabela para armazenar essas infos
  		// colunas ->  wallet, password, seed;

  		this.createWallet(seed, content.password);
  	}, error => {
  		console.error(error);
  	})
  }

  createWallet(seed, password){
  	this.http.post(this.address('/wallet/create'), {password: password})
  	.subscribe(wallet => {
  		console.log(wallet);

  		// armazenar a wallet do usuario

  		// armazenar o hash da senha do usuario

  		// voltar a home e mostrar o endereço da carteira o saldo e explicar como colocar dinheiro na carteira (coinbase)

  		// posso colocar falcets e permitir que a galera use assim por hora.
  		
  	}, error => {
  		console.error(error);
  	})
  }

  address(path){
  	return this.api+path;
  }

}
