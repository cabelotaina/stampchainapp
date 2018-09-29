import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { CompanyProvider, Company } from '../../providers/company/company'
// in the future add company type
import { CompanyProvider } from '../../providers/company/company'
import { AddCompanyPage } from '../../pages/add-company/add-company'

@IonicPage()
@Component({
  selector: 'page-list-company',
  templateUrl: 'list-company.html',
})
export class ListCompanyPage {

  // public companies = [Company];
  public companies;
  public add_company;
  public addresses;

  constructor(private navCtrl: NavController, private navParams: NavParams, 
    private companyProvider: CompanyProvider ) {
    this.add_company = AddCompanyPage;
  	companyProvider.getAll()
  	.then((companies) => {
  		console.log('Companies: '+JSON.stringify(companies, null, 1));
      this.companies = companies;
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListCompanyPage');
  }

  public removeCompany(id){
    this.companyProvider.remove(id);

    this.companyProvider.getAll()
    .then((companies) => {
      console.log('Companies: '+JSON.stringify(companies, null, 1));
      this.companies = companies;
    });
  }

  open(url){
    this.navCtrl.setRoot(url);
  }

  public updateCompany(id) {
    console.log(id);
    // this.navCtrl.push();
  }

}
