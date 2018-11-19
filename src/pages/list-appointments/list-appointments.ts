import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
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
import { LevelsPage } from "../levels/levels";
import { PlaySettingsPage } from "../play-settings/play-settings";
import { MatchesPage } from "../matches/matches";
import { WatchPage } from "../watch/watch";
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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth:AuthProvider,
    public api: ApiProvider,
    public notify: NotificationsProvider
  ){

  }


  getAllAppointments() {
    this.api.postData(null, 'getAllAppointments/')
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.notify.simpleTimeToast('Some error occured');
        } else {
          let response: any = res ? JSON.parse(res) : 'error';
        this.appointments = response;
        }
      },
        err => {
          this.notify.simpleTimeToast(err);
        }
      );
  }

}
