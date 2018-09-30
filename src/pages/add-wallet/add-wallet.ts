import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BlockchainProvider } from '../../providers/blockchain/blockchain';

import { HomePage } from '../../pages/home/home'

@IonicPage()
@Component({
  selector: 'page-add-wallet',
  templateUrl: 'add-wallet.html',
})
export class AddWalletPage {

	public content;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private blockchainProvider: BlockchainProvider, private toastCtrl: ToastController) {
  	this.content = {
  		password1: '',
  		password2: '',
  		word: ''
  	};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddWalletPage');
  }

  addWallet(){
  	if (this.content.password1 !== this.content.password2 || this.content.password1 === '' || this.content.password2 === ''){
  		console.error('As senhas precisam ser iguais!');
  		this.walletToast('As senhas precisam ser iguais!');
  	} else if (this.content.word === '') {
  		this.walletToast('Você precisa fornecer a palavra geradora!');
  	}else {
  		console.log(this.content);
  		this.blockchainProvider.create(this.content);
      this.walletToast('Carteira criada com sucesso!');
      this.navCtrl.push(HomePage);
  	}
  }

  walletToast(message) {
	  let toast = this.toastCtrl.create({
	    message: message,
	    duration: 3000,
	    position: 'top'
	  });

	  toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });

	  toast.present();
  }

}
