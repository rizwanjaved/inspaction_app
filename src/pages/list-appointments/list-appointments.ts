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
 * Generated class for the ListAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-appointments',
  templateUrl: 'list-appointments.html',
})
export class ListAppointmentsPage {
  appointments;
  inspectLink;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth:AuthProvider,
    public api: ApiProvider,
    public notify: NotificationsProvider,
    private storage: Storage,
    public alert: AlertController
  ){

  }
  ionViewDidEnter() {
    this.inspectLink = this.navParams.get('inspectLink');
    this.storage.get('accessToken').then((token) => {
      this.api.access_token = token;
      this.getAllAppointments();
    }).catch((err) => {
      console.log(err)
    });
    console.log('  this.inspectLink ', this.inspectLink );
  }


  getAllAppointments() {
    this.notify.presentLoader('Appointments list is loading');
    this.api.postData(null, 'getAllAppointments')
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast('Some error occured');
        } else {
          let response: any = res ? JSON.parse(res) : 'error';
        this.appointments = response ? response.appointments : null;
        console.log('appointments', this.appointments);
          this.notify.dismissLoader();
          if (this.appointments.length == 0) {
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
      title: 'Appointments',
      subTitle: 'Appointment List is empty ! click ok to Go back',
      buttons: [{
        text: 'OK',
        handler: data => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }
  viewAppointment(apt) {
    this.navCtrl.push(ViewAppointmentPage, {appointment:apt})
  }
  inspect(apt) {
    this.navCtrl.push(CarInspectionPage, { appointment: apt });
  }

}
