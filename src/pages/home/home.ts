import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CalendarPage } from '../../pages/calendar/calendar'
import { SettingsPage } from '../../pages/settings/settings'
import { ListCompanyPage } from '../../pages/list-company/list-company'
import { AddCompanyPage } from '../../pages/add-company/add-company'
import { AddWalletPage } from '../../pages/add-wallet/add-wallet'
import { UserProvider } from '../../providers/user/user'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public web3: any;
  public calendar; settings; list_company; add_company; add_wallet;
  public nav;
  public home;
  private fakeWallet;
  public wallet;

  constructor(nav: NavController, private userProvider: UserProvider){
    this.calendar = CalendarPage;
    this.nav = nav;
    this.settings = SettingsPage;
    this.list_company = ListCompanyPage;
    this.add_company = AddCompanyPage;
    this.add_wallet = AddWalletPage;
    this.fakeWallet = `{"salt":"XiM6cGNi76W343X0h15a1J7FiIXFhr98k5e4dHHWfG0=","hdPathString":"m/0'/0'/0'","encSeed":{"encStr":"MbA/cAiXRKJy9NlkC+VhXde0IlTdk1EEbiNQVINIvXv+OKMIM5z0i7mgWyWY7P25jhTuTa0gjaB8kMIo2ERObGkSfoM8bIcvnLT1nfPImtMy3BxBN5MNNtv2IxnN+6TSWPWwdBZqFKcjoTAazoB86ktPFcM1NwEIoocbe/XXdbqy5emOxBacSw==","nonce":"bQrxpclAqIM3ZFyMmaWOb2F3+dtIEKJ3"},"encHdRootPriv":{"encStr":"1mmn8dRY+eigpDp7nyoZRFTtFKEJubjiUkC7rofVip97jvOzmXbysgixlHdtA8Z7oN3PnODpdQmTf+kbhtd9tSnRAugH+S0Afi67iuT09Dxa4JpOFt08zzP9vW72gDKTmIpbph1KHdPSQ4YPHXJbrvM6Kd+YjOAgtIX+ffZVkQ==","nonce":"5NfjWYekz2W3GrGy4HbO9/Ms2MgwOnjt"},"version":3,"hdIndex":1,"encPrivKeys":{"fc999943e43e8f408403134dbec9e6a961143470":{"key":"X3QkSuukjxZNzyyfAEGoRajl1UmZPEHtEMZi6CIMIl3iUKtUqPg0l/xqiLXyDIW3","nonce":"c9HJIDP588xX7xWFC1iwbUacpFYB/Axt"}},"addresses":["fc999943e43e8f408403134dbec9e6a961143470"]}`;

    // mostrar o endereço da carteira o saldo e explicar como colocar dinheiro na carteira (coinbase)
    this.userProvider.getAll()
    .then(users => {
      console.log(JSON.stringify(users, null, 1));
      if (users){
        // for()
      }

      this.wallet = JSON.parse(this.fakeWallet);
      // console.log(JSON.stringify(this.wallet));
    }, error => {
      console.error(JSON.stringify(error, null, 1));
    })


    // posso colocar falcets e permitir que a galera use assim por hora.

  }

  ngOnInit(){
    this.wallet = JSON.parse(this.fakeWallet);
  }

  goTo(page){
  	console.log(page);
  	this.nav.setRoot(page);
  }
}