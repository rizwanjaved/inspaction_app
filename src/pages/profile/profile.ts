import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage 
  ) {
  }
  ionViewWillEnter() {
    this.storage.get('userData').then(data => {
      console.log('Data', data);
      this.userData = data;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
