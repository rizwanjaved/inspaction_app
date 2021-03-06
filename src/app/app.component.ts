import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from "../pages/home/home";
import { LoginPage } from "../pages/login/login";
import {Storage} from '@ionic/storage';
import {AuthProvider} from '../providers/auth/auth';




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

  rootPage: any;// PlayPage;//HomePage;//PlayPage;//SettingsPage;////LandingPage;//AddPatientPage;
  user :any;

  appMenuItems: Array<MenuItem>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private storage: Storage,
    public auth:AuthProvider,
  ) {
    this.initializeApp();

    this.appMenuItems = [
      {title: 'Home', component: HomePage, icon: 'home', root:true},
      // {title: 'Local Weather', component: LocalWeatherPage, icon: 'partly-sunny'}
    ];
    /* firebase */
    // const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     this.rootPage = LoginPage;
    //     unsubscribe();
    //   } else {
    //     this.rootPage = HomePage;
    //     unsubscribe();
    //   }
    // });
    this.storage.get('accessToken').then(token=> {
      if(token) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    // unsubscribe();
    /* firebase */
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
    console.log('page is', page);
  }

  logout() {
    // this.auth.logoutUser()
    // .then(res =>{
    //   console.log('logout res', res);       
    //   this.storage.remove('user');
    //   this.storage.remove('userData');
    //   this.storage.remove('userData');
    //   this.nav.setRoot(LoginPage);
    // },
    // err =>{
    //   console.log('err', err);       
    // }
    // );
    this.storage.remove('user');
    this.storage.remove('userData');
    this.storage.remove('userCar');
    this.storage.remove('accessToken');
    this.storage.remove('userType');
    this.nav.setRoot(LoginPage);
  }

  openMenu() {
    this.auth.menuButton = "close";
    console.log('menu is opened ', this.auth.menuButton);
  }
  closeMenu() {
    this.auth.menuButton = "menu";
    console.log('menu is closed ', this.auth.menuButton);
  }
}
