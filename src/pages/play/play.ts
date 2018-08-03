import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListUsersPage } from "../list-users/list-users";

/**
 * Generated class for the PlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayPage');
  }
  goToPage(page) {
    if(page == 'listUsers') {
      this.nav.push(ListUsersPage);
    }
  }

}
