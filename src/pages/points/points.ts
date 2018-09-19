import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PointProvider, Point } from '../../providers/point/point';

/**
 * Generated class for the PointsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {
  public points;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private pointProvider: PointProvider) {
  }

  ionViewDidEnter() {
    this.pointProvider.getAll()
      .then((points) => {
        console.log('Points getAll: '+JSON.stringify(points, null, 1))
        this.points = points;
      });
  }

}
