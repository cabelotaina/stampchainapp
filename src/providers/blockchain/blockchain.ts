import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserProvider, User } from '../user/user'

@Injectable()
export class BlockchainProvider {

	private api;
  private options
  private user: User = {
    id: 0,
    password: '',
    wallet: '',
    seed: ''
  }

  constructor(public http: HttpClient, private userProvider: UserProvider) {
    this.api = 'http://51.15.225.121';
  }

  create(content){
  	// create seed
  	this.http.get(this.address('/seed/'+content.word))
  	.subscribe(response => {
  		console.log(response);
  		this.createWallet(response['seed'], content.password1);
  	}, error => {
  		console.error(error);
  	})
  }

  createWallet(seed, password){
  	this.http.post(this.address('/wallet'), {password: password, seed: seed})
  	.subscribe(response => {
  		console.log(response);

      this.user.password = password;
      this.user.wallet = JSON.stringify(response['wallet']);
      this.user.seed = seed;

      this.userProvider.insert(this.user);
  		
  	}, error => {
  		console.error(error);
  	})
  }

  address(path){
  	return this.api+path;
  }

}
