import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import { LandingPage } from "../pages/landing/landing";
import { AddPatientPage } from "../pages/add-patient/add-patient";
import { LocalWeatherPage } from "../pages/local-weather/local-weather";
import {Storage} from '@ionic/storage';
import {AuthProvider} from '../providers/auth/auth';
import { PatientsPage } from "../pages/patients/patients";
import { SettingsPage } from "../pages/settings/settings";
import { PlayPage } from "../pages/play/play";




export interface MenuItem {
    title: string;
    component: any;
    icon: string;
    root: boolean;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;//PlayPage;//SettingsPage;////LandingPage;//AddPatientPage;
  user :any;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public auth:AuthProvider
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home', root:true},
      {title: 'Patients Page', component: PatientsPage  , icon: 'contact', root:false}
      // {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);

    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.root) {
      this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
  }
  goToPage(page) {
    if(page == 'home') {
      this.nav.setRoot(HomePage);
    }
    if(page == 'settings') {
      this.nav.setRoot(SettingsPage);
    }
  }

  logout() {
    this.auth.logout()
    .subscribe(res => {
     if(res.success == 200) {
        this.storage.remove('user');
        this.nav.setRoot(LoginPage);
     } else {
      this.storage.remove('user');
      this.nav.setRoot(LoginPage);
     }
     },
     err => {
      this.storage.remove('user');
      this.nav.setRoot(LoginPage);
     });
  }
}
