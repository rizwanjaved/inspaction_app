import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { HomePage } from "../home/home";
import { CarInspectionPage } from '../car-inspection/car-inspection'

/**
 * Generated class for the ViewAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-appointment',
  templateUrl: 'view-appointment.html',
})
export class ViewAppointmentPage {
  userType;
  appointment;
    constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private storage: Storage,
    public api: ApiProvider,
    public notify: NotificationsProvider,
  ) {}

  backToPreviousPage() {
    this.navCtrl.pop();
  }
  ionViewDidEnter() {
    // this.appointment = this.navParams.get('appointment');
    this.storage.get('userType').then(role => {
      this.userType= role;
      this.notify.presentLoader('Processing Appointment');
      if(role=='User') {
        this.api.postData(null, 'viewAppointment')
          .subscribe(res => {
            if (res && res.type && res.type == 'error') {
              this.notify.dismissLoader();
              this.notify.simpleTimeToast('Some error occured');
            } else {
              this.notify.dismissLoader();
              let response: any = res ? JSON.parse(res) : 'error';
              if (response && response.success) {
                this.appointment = response.appointment;
              } else {
                this.notify.simpleTimeToast('Appointment not loaded');
              }
            }
          },
            err => {
              this.notify.dismissLoader();
              this.notify.simpleTimeToast(err);
            }
          );
      } else {
         this.notify.dismissLoader();
        this.appointment = this.navParams.get('appointment');
      }
    });
  }

  ionViewDidLoad() {
    console.log('appointment details', this.appointment);
  }
  inspect() {
    this.navCtrl.push(CarInspectionPage, {appointment: this.appointment});
  }
  goToHome() {
    this.navCtrl.push(HomePage);
  }

}
