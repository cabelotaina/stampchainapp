import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CompanyProvider, Company } from '../../providers/company/company';
import { AddressProvider, Address } from '../../providers/address/address';

declare var google;

@IonicPage()
@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.html',
})
export class AddCompanyPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

	private GoogleAutocomplete;
	private autocomplete;
	private autocompleteItems;
	private geocoder;
	private markers;
	public company: Company = { 
		id: 0,
		name: '', 
		goJob: '', 
		outJob: '', 
		isMyActualJob: false
	};

	public addresses = Array<Address>();


  constructor(public navCtrl: NavController, public navParams: NavParams, 
  	private geolocation: Geolocation, private zone: NgZone, private companyProvider: CompanyProvider,
  	private addressProvider: AddressProvider) {
		this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
		this.autocomplete = { input: '' };
		this.autocompleteItems = [];
		this.geocoder = new google.maps.Geocoder;
		this.markers = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCompanyPage');
  }

	ionViewDidEnter(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

	addMarker(){
	  let marker = new google.maps.Marker({
	    map: this.map,
	    animation: google.maps.Animation.DROP,
	    position: this.map.getCenter()
	  });
	 
	  let content = "<h4>Você trabalha aqui?</h4>";
	 
	  this.addInfoWindow(marker, content);
	 
	}

	addInfoWindow(marker, content){
	 
	  let infoWindow = new google.maps.InfoWindow({
	    content: content
	  });
	 
	  google.maps.event.addListener(marker, 'click', () => {
	    infoWindow.open(this.map, marker);
	  });
	 
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
		console.log(item)
	  // this.clearMarkers();
	  this.autocompleteItems = [];

	  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
	    if(status === 'OK' && results[0]){
	      let position = {
	          lat: results[0].geometry.location.lat,
	          lng: results[0].geometry.location.lng
	      };

	      this.addresses.push({
	      	id: null,
	      	description: item.description,
	      	latitude: results[0].geometry.location.lat(),
	      	longitude: results[0].geometry.location.lng(),
	      	company_id: null
	      })

	      // mapa que estava sendo usado

	      // let marker = new google.maps.Marker({
	      //   position: results[0].geometry.location,
	      //   map: this.map,
	      // });
	      // this.markers.push(marker);
	      // this.map.setCenter(results[0].geometry.location);
	    }
	  })
  }

  addCompany(){

  	// log de compania
  	console.log('Insert Company: '+JSON.stringify(this.company, null, 1));

  	// log de endereços
  	console.log('Insert Addresses: '+JSON.stringify(this.addresses, null, 1));
  	// adidionar companias 
  	let company = this.companyProvider.insert(this.company);

  	console.log(company);

  	// adicionar endereços



  	// limpar formulario
  	// ir para a lista de empresas

  }

  removeAddress(address){
  	let index = this.addresses.findIndex(x => x.description === address.description);
  	this.addresses.splice(index, 1);
  }

}
