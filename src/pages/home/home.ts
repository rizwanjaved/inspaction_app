import { Component } from "@angular/core";
import { NavController, PopoverController } from "ionic-angular";
import { Storage } from '@ionic/storage';

import { NotificationsPage } from "../notifications/notifications";
import { SettingsPage } from "../settings/settings";
import { TripsPage } from "../trips/trips";
import { SearchLocationPage } from "../search-location/search-location";
import { CommonSearchPage } from "../common-search/common-search";
import { LoginPage } from "../login/login";
import { LevelsPage } from "../levels/levels";
import { PerformaProvider } from '../../providers/performa/performa';
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
    public performa: PerformaProvider,
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
    this.loadPatients();
    this.n = this.auth.menuButton;
    console.log('menu button is',this.n);
  }
  // ionViewDidLoad() {
  //   this.loadPatients();
  // }

  loadPatients() {
    this.performa.getAllPatients().then((data: any) => {
      if (data && data.docs) {
        this.patients = data.docs;
        // this.selectedPatient = this.patients.map(x => {
        //   if (x._id == this.performa.selectedPatient) {
        //     return x;
        //   }
        // });
      } else {
        this.patients = null;
      }
      console.log('this.performa.selectedPatient', this.performa.selectedPatient);
      console.log('this.selectedPatient', this.selectedPatient);
    });
    this.selectedPatient = this.performa.selectedPatient;
  }
  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }
  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // choose place
  serachPatient() {
    this.nav.push(CommonSearchPage, 'patients');
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  gotToLevels() {
    console.log('ccccccccccc');
     this.nav.setRoot(LevelsPage);
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
