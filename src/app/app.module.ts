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
import {ProfilePage} from "../pages/profile/profile";
import {ListUsersPage} from "../pages/list-users/list-users";
import {CheckBookingPage} from "../pages/check-booking/check-booking";
import {CarInspectionPage} from "../pages/car-inspection/car-inspection";
import {BookAppointmentPage} from "../pages/book-appointment/book-appointment";
import {ViewAppointmentPage} from "../pages/view-appointment/view-appointment";
import {InspectionResultPage} from "../pages/inspection-result/inspection-result";
import {ContraventionPage} from "../pages/contravention/contravention";
import {RegiterationPage} from "../pages/regiteration/regiteration";
import { AuthProvider } from '../providers/auth/auth';
import { HttpModule } from '@angular/http';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { ListContraventionsPage } from "../pages/list-contraventions/list-contraventions";
import { ListAppointmentsPage } from "../pages/list-appointments/list-appointments";
import { ApiProvider } from '../providers/api/api';



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
    ProfilePage,
    ListUsersPage,
    CheckBookingPage,
    CarInspectionPage,
    BookAppointmentPage,
    ViewAppointmentPage,
    InspectionResultPage,
    ContraventionPage,
    RegiterationPage,
    ListAppointmentsPage,
    ListContraventionsPage
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
    ProfilePage,
    ListUsersPage,
    CheckBookingPage,
    CarInspectionPage,
    BookAppointmentPage,
    ViewAppointmentPage,
    InspectionResultPage,
    ContraventionPage,
    RegiterationPage,
    ListAppointmentsPage,
    ListContraventionsPage
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
    ApiProvider,
    // FileUploadOptions,
  ]
})

export class AppModule {
}
