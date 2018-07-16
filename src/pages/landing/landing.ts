import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {PatientsPage} from "../patients/patients";


/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page) {
    switch(page) {
      case 'home':
        this.navCtrl.setRoot(HomePage);
        break;
      case 'patient':
        this.navCtrl.push(PatientsPage);
        break;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
