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
