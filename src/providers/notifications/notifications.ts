import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {NavController, LoadingController, ToastController} from "ionic-angular";
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class NotificationsProvider {

  constructor(
    public http: Http,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController
  ) {
    // console.log('Hello NotificationsProvider Provider');
  }
  simpleTimeToast(msg) {
    console.log('notifications', msg);
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      // cssClass: 'profile-bg',
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
