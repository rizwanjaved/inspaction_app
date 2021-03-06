import { Component } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { LoginPage } from "../login/login";
import { CheckBookingPage } from "../check-booking/check-booking";
import { BookAppointmentPage} from "../book-appointment/book-appointment";0
import { CarInspectionPage } from "../car-inspection/car-inspection";
import {ViewAppointmentPage} from  "../view-appointment/view-appointment";
import {InspectionResultPage} from "../inspection-result/inspection-result";
import {ContraventionPage} from "../contravention/contravention";
import {RegiterationPage} from "../regiteration/regiteration";
import { AuthProvider } from '../../providers/auth/auth';
import { ListAppointmentsPage } from "../list-appointments/list-appointments";
import { ListContraventionsPage } from "../list-contraventions/list-contraventions";






@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  public patients;
  public selectedPatient;
  public userRole: string;
  n;
  constructor(
    private storage: Storage,
    public nav: NavController,
    public popoverCtrl: PopoverController,
    public auth:AuthProvider
  ) {
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    // this.performa.selectedPatient = null;
  }
  ionViewCanEnter() {
    // this.redirect();
    // return true;
  }
  ionViewDidEnter() {
    this.n = this.auth.menuButton;
    console.log('menu button is',this.n);
    this.storage.get('userType').then((val) => {
      this.userRole = val;
      console.log('userType', this.userRole);
    }).catch((err) => {
      console.log(err)
    });
  }
  // ionViewDidLoad() {
  //   this.loadPatients();
  // }


  // go to result page
  doSearch() {
  }
  // choose place
  choosePlace(from) {
  }

  // choose place
  serachPatient() {
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  goToListAppointmentsPage(type) {
    console.log('type', type);
    this.nav.push(ListAppointmentsPage, {inspectLink:type});
  }

  gotToLevels() {
     this.nav.setRoot(LevelsPage);
  }
  gotToPlaySettings() {
    this.nav.setRoot(PlaySettingsPage);
  }
  gotToMatches() {
    this.nav.push(MatchesPage);
  }
  navToCheckBooking() {
    this.nav.push(CheckBookingPage);
  }
  navToCarInspection() {
    this.nav.push(CarInspectionPage);
  }
  navToBookAppointment() {
    this.nav.push(BookAppointmentPage);
  }
  navToViewAppointment() {
    this.nav.push(ViewAppointmentPage);
  }
  navToInspectionResult() {
    this.nav.push(InspectionResultPage);
  }
  navToContraventions() {
    this.nav.push(ListContraventionsPage);
  }
  navToRegistration() {
    this.nav.push(RegiterationPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  redirect() {
    this.storage.get('user').then(data => {
      if (!data || data.name == null) {
        this.nav.setRoot(LoginPage);
      }
      console.log('dataaaa', data);
    });
  }

}

//
