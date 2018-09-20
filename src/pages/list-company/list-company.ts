import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProvider, Company } from '../../providers/company/company'
import { AddressProvider, Address } from '../../providers/address/address'

@IonicPage()
@Component({
  selector: 'page-list-company',
  templateUrl: 'list-company.html',
})
export class ListCompanyPage {

  public companies;

  constructor(public navCtrl: NavController, public navParams: NavParams, public companyProvider: CompanyProvider,
  	public addressProvider: AddressProvider) {
  	companyProvider.getAll()
  	.then((companies) => {
  		console.log('Companies: '+JSON.stringify(companies, null, 1));
      this.companies = companies;
      // for (var i in companies){
      //   companies[i].addresses
      //   .then(data => {
      //     console.log('Data value: '+data)
      //     if (data !== 'undefined'){
      //       if (data.rows.length > 0) {
      //         let addresses: any[] = [];
      //         for (var i = 0; i < data.rows.length; i++) {
      //           var address = data.rows.item(i);

      //           addresses.push(address);
      //         }
      //         console.log('Endereços: '+addresses)
      //         companies[i].addresses = addresses;
      //       } else {
      //         companies[i].addresses = [];
      //       }
      //     } else {
      //        companies[i].addresses = [];
      //     }
      //   })
      // }

      // fazer um for de companies e pegar os endereços das companias uma a uma

      // addressProvider.getAll(compa)
      // .then(addres)
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCompanyPage');
  }

  public removeCompany(id){
    console.log(id)

    // remove company
    this.companyProvider.remove(id);
    // remove company addresses


    // reload companies

    this.companyProvider.getAll()
    .then((companies) => {
      console.log('Companies: '+JSON.stringify(companies, null, 1));
      this.companies = companies;
    });
  }

  public updateCompany(id) {
    console.log(id);

    // router leva o usuario apara a tela de atualizar a empresa e envia o id como parametro
  }

}
