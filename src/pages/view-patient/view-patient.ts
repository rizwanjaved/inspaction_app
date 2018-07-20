import { Component } from '@angular/core';
import { NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ViewPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-patient',
  templateUrl: 'view-patient.html',
})
export class ViewPatientPage {
  patient:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.patient=this.navParams.get('patientDetails');
    console.log('ionViewDidLoad ViewPatientPage', this.patient);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
