import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CompanyProvider, Company } from '../../providers/company/company';
import { ListCompanyPage } from '../../pages/list-company/list-company'

declare var google;

@IonicPage()
@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.html',
})
export class AddCompanyPage {

  map: any;

	private GoogleAutocomplete;
	private autocomplete;
	private autocompleteItems;
	private geocoder;
	public company: Company = { 
		id: 0,
		name: '', 
		goJob: '', 
		outJob: '', 
		isMyActualJob: false,
		addresses: ''
	};

	public list_page;

	public addresses = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
  	private geolocation: Geolocation, private zone: NgZone, private companyProvider: CompanyProvider) {
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
		this.geocoder = new google.maps.Geocoder;
		this.list_page = ListCompanyPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCompanyPage');
  }

	updateSearchResults(){
	  if (this.autocomplete.input == '') {
	    this.autocompleteItems = [];
	    return;
	  }
	  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
		(predictions, status) => {
	    this.autocompleteItems = [];
	    this.zone.run(() => {
	      predictions.forEach((prediction) => {
	        this.autocompleteItems.push(prediction);
	      });
	    });
	  });
	}

	selectSearchResult(item){
		console.log(item);

	  this.autocompleteItems = [];

	  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
	    if(status === 'OK' && results[0]){

	      this.addresses.push({
	      	id: null,
	      	description: item.description,
	      	latitude: results[0].geometry.location.lat(),
	      	longitude: results[0].geometry.location.lng(),
	      	company_id: null
	      });
	    }
	  })
  }

  addCompany(list_page){
  	// log de compania
  	console.log('Insert Company: '+JSON.stringify(this.company, null, 1));
  	console.log('Insert Addresses: '+JSON.stringify(this.addresses, null, 1));

  	if (this.company.isMyActualJob){
  		this.company.outJob = null;
  	}

  	let messages = 'Por Favor';
  	let error = false;
  	if (this.company.name === '') {
  		messages += ' preencha o nome da empresa. ';
  		error = true;
  	}
  	if (this.company.goJob === ''){
  		messages += ' preencha a data de ingresso na empresa.';
  		error = true;
  	}
  	if (this.company.outJob === '' || !this.company.isMyActualJob){
  		messages += ' preencha a data que você deixou a empresa.';
  		error = true;
  	}

  	if (error){
  		this.companyToast(messages);
  	} else {
	  	console.log('Insert Addresses: '+JSON.stringify(this.addresses, null, 1));
	    this.company.addresses = JSON.stringify(this.addresses);
	  	this.companyProvider.insert(this.company);
	  	this.navCtrl.push(ListCompanyPage);
  	}

  }

  companyToast(message) {
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

  removeAddress(address){
  	let index = this.addresses.findIndex(x => x.description === address.description);
  	this.addresses.splice(index, 1);
  }

}
