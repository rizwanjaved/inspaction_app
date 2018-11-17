import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InspectionResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inspection-result',
  templateUrl: 'inspection-result.html',
})
export class InspectionResultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  backToPreviousPage() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionResultPage');
  }

}
