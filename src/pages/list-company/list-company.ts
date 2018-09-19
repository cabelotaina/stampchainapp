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
  		console.log('Companies: '+JSON.stringify(companyProvider, null, 1));
      this.companies = companies;
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCompanyPage');
  }

}
