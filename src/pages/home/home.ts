import { Component } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { LoginPage } from "../login/login";
import { CheckBookingPage } from "../check-booking/check-booking";
import { CarInspectionPage } from "../car-inspection/car-inspection";
import { LevelsPage } from "../levels/levels";
import { PlaySettingsPage } from "../play-settings/play-settings";
import { MatchesPage } from "../matches/matches";
import { WatchPage } from "../watch/watch";
import { AuthProvider } from '../../providers/auth/auth';





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
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil";
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
    // this.performa.selectedPatient = null;
    this.selectedPatient = "";
  }
  ionViewCanEnter() {
    // this.redirect();
    // return true;
  }
  ionViewDidEnter() {
    this.n = this.auth.menuButton;
    console.log('menu button is',this.n);
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
