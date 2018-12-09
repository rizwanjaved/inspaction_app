import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { LoginPage } from "../login/login";
import { CheckBookingPage } from "../check-booking/check-booking";
import { BookAppointmentPage } from "../book-appointment/book-appointment"; 0
import { CarInspectionPage } from "../car-inspection/car-inspection";
import { ViewAppointmentPage } from "../view-appointment/view-appointment";
import { InspectionResultPage } from "../inspection-result/inspection-result";
import { ContraventionPage } from "../contravention/contravention";
import { RegiterationPage } from "../regiteration/regiteration";
import { AuthProvider } from '../../providers/auth/auth';
import { NotificationsProvider } from '../../providers/notifications/notifications';


/**
 * Generated class for the ListContraventionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-contraventions',
  templateUrl: 'list-contraventions.html',
})
export class ListContraventionsPage {
  contraventions;
  userCar;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public api: ApiProvider,
    public notify: NotificationsProvider,
    private storage: Storage,
    public alert: AlertController
  ) {

  }

  ionViewDidEnter() {
    this.storage.get('accessToken').then((token) => {
      this.api.access_token = token;
      this.getAllContraventions();
    }).catch((err) => {
      console.log(err)
    });
  }


  getAllContraventions() {
    this.notify.presentLoader('Contravention list is loading');
    this.api.postData(null, 'getAllContraventions')
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast('Some error occured');
        } else {
          let response: any = res ? JSON.parse(res) : 'error';
          this.contraventions = response ? response.contraventions : null;
          console.log('contraventions', this.contraventions);
          this.notify.dismissLoader();
          if (this.contraventions.length == 0) {
            this.showAlert();
          }
        }
      },
        err => {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast(err);
        }
      );
  }
  showAlert() {
    const alert = this.alert.create({
      title: 'Contravention',
      subTitle: 'Contravention List is empty ! click ok to Go back',
      buttons: [{
        text: 'OK',
        handler: data => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }
  toContravention(cnt) {
    this.navCtrl.push(ContraventionPage, { conrtravention: cnt })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListContraventionsPage');
  }

}
