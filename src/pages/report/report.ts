import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PointProvider } from '../../providers/point/point'
import { CompanyProvider } from '../../providers/company/company'

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {


  private atan2 = Math.atan2;
  private cos = Math.cos;
  private sin = Math.sin;
  private sqrt = Math.sqrt;
  private PI = Math.PI;
  private R = 6378137

	private points;
	public companies;
	private company;
	public reports = Array();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private pointProvider: PointProvider, companyProvider: CompanyProvider) {


		var monthNames = new Array();

		monthNames[0] = "Janeiro";
		monthNames[1] = "Fevereiro";
		monthNames[2] = "Março";
		monthNames[3] = "Abril";
		monthNames[4] = "Maio";
		monthNames[5] = "Junho";
		monthNames[6] = "Julho";
		monthNames[7] = "Agosto";
		monthNames[8] = "Setembro";
		monthNames[9] = "Outubro";
		monthNames[10] = "Novembro";
		monthNames[11] = "Dezembro";

  	
  	this.companies = companyProvider.getFakeCompanies();
  	// obter o tempo para cada empresa agora, numa proxima versão permitir escolher...
  	for(let company of this.companies){
  		// tenho que validar o outJob
			let goJob = new Date(company.goJob);
			// vamos considerar que o trabalho tem apenas um endereço por agora
			let companyAddress = JSON.parse(company.addresses);

			var today = new Date();

			if (company.isMyActualJob){
				// buscar no banco de dados todos os stamps desde o goJob
				this.points = pointProvider.getFakePoints();
			  let firstDate = new Date(parseInt(this.points[0].timestamp));

			  let months = this.monthDiff(firstDate, today);

			  let monthsArray = Array();

			  console.log(months);

			  if (months === 0) {
			  	let monthName = monthNames[today.getMonth()];
					let lastPoint = this.points[0];
					let time = 0;//min
					for(let point of this.points){

						console.log();
						let distance = this.haversineDistance(companyAddress, point);
						if (distance < 200){
							let diference = (parseInt(point.timestamp)-parseInt(lastPoint.timestamp))/3600000;
							if(!(diference > 1)){
								// mas hoje a distancia entre os dois stamps esta maior que o previsto... tenho que corrigir
								time += diference;
							} 
						}
						lastPoint = this.copy(point);
					}

					let hour: any = parseInt(time);
					let minute: any = parseInt((time%1)*60);
					let second: any = parseInt((((time%1)*60)%1)*1000);

					monthsArray.push({name: monthName, hour: hour, minute: minute, second: second})

			  } else {
			  	// aqui vai ser o caso de mais de 1 mês

			  		let monthIndex = 0;

					  let monthName = monthNames[(today.getMonth()-1)+monthIndex];
						let lastPoint = this.points[0];
						let time = 0;//min
						for(let point of this.points){
							let distance = this.haversineDistance(companyAddress, point);
							let actualDate = new Date(parseInt(point.timestamp));
							let lastDate = new Date(parseInt(lastPoint.timestamp));

							if ((actualDate.getMonth()-lastDate.getMonth() > 0)){

								let hour = parseInt(time);
								let minute = parseInt((time%1)*60);
								let second = parseInt((((time%1)*60)%1)*1000);

								time = 0;

								monthsArray.push({name: monthName, hour: hour, minute: minute, second: second});
							}
							if (distance < 200){
								let diference = (parseInt(point.timestamp)-parseInt(lastPoint.timestamp))/3600000;
								if(!(diference > 1)){
									// mas hoje a distancia entre os dois stamps esta maior que o previsto... tenho que corrigir
									time += diference;
								}
						  }
						  lastPoint = this.copy(point);
					  }
					   let monthName = monthNames[(today.getMonth()	)];
						let hour: any = parseInt(time);
						let minute: any = parseInt((time%1)*60);
						let second: any = parseInt((((time%1)*60)%1)*1000);

						time = 0;

						monthsArray.push({name: monthName, hour: hour, minute: minute, second: second});
				}

				this.reports.push({name: company.name, months: monthsArray});
			} else {
				let outJob = new Date(company.outJob);
				// buscar no banco de dados todos os pontos entre goJob e outJob
				this.points = pointProvider.getFakePoints();
				let lastPoint = this.points[0];
				let time = 0;//min
				for(let point of this.points){
					let distance = this.haversineDistance(companyAddress, point);

					if (distance < 200){
						let diference = (parseInt(point.timestamp)-parseInt(lastPoint.timestamp))/3600000;
						if(!(diference > 1)){
							// mas hoje a distancia entre os dois stamps esta maior que o previsto... tenho que corrigir
							time += diference;
						}
					}
					lastPoint = point;
				}

				this.reports.push({name: company.name, hour: parseInt(time), minutes: (time%1)*60});
			}
  	}

  	console.log(this.reports);


  	// aqui fica como vou pegar as empresas
  	// this.companies = companyProvider.getAll().
  	// then(result => {
  	// 	console.log(result);
  	// })

  	// console.log(this.companies);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  private copy(object) {
	  return JSON.parse(JSON.stringify(object));
	}

	private monthDiff(d1, d2) {
	    var months;
	    months = (d2.getFullYear() - d1.getFullYear()) * 12;
	    months -= d1.getMonth();
	    months += d2.getMonth();
	    return months <= 0 ? 0 : months;
	}

  private squared (x) { return x * x }

  private toRad (x) { return x * this.PI / 180.0 }


	private haversineDistance (a, b) {
	  let aLat = a.latitude || a.lat
	  let bLat = b.latitude || b.lat
	  let aLng = a.longitude || a.lng || a.lon
	  let bLng = b.longitude || b.lng || b.lon

	  let dLat = this.toRad(bLat - aLat)
	  let dLon = this.toRad(bLng - aLng)

	  let f = this.squared(this.sin(dLat / 2.0)) + this.cos(this.toRad(aLat)) * this.cos(this.toRad(bLat)) * this.squared(this.sin(dLon / 2.0))
	  let c = 2 * this.atan2(this.sqrt(f), this.sqrt(1 - f))

	  return this.R * c
	}

}
