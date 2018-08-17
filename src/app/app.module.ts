import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";

import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {LevelsPage} from "../pages/levels/levels";
import {PlayPage} from "../pages/play/play";
import {ProfilePage} from "../pages/profile/profile";
import {ListUsersPage} from "../pages/list-users/list-users";
import {PlayedGamesPage} from "../pages/played-games/played-games";
import {PlaySettingsPage} from "../pages/play-settings/play-settings";
import {TopPlayersPage} from "../pages/top-players/top-players";




import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    LevelsPage,
    PlayPage,
    ProfilePage,
    ListUsersPage,
    PlayedGamesPage,
    PlaySettingsPage,
    TopPlayersPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: 'performa',
        driverOrder: ['sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    LevelsPage,
    PlayPage,
    ProfilePage,
    ListUsersPage,
    PlayedGamesPage,
    PlaySettingsPage,
    TopPlayersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    AuthProvider,
    NotificationsProvider,
    FileTransfer,
    FileTransferObject,
    File,
    // FileUploadOptions,
  ]
})

export class AppModule {
}
