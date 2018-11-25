import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { HomePage } from "../home/home";
import { CarInspectionPage } from '../car-inspection/car-inspection'

/**
 * Generated class for the InspectionResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inspection-result',
  templateUrl: 'inspection-result.html',
})
export class InspectionResultPage {
  inspection;
  car;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private storage: Storage,
    public api: ApiProvider,
    public notify: NotificationsProvider,
  ) { }


  ionViewDidEnter() {
    // this.appointment = this.navParams.get('appointment');
    this.notify.presentLoader('Processing Inspection');
    this.api.postData(null, 'viewInspection')
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast('Some error occured');
        } else {
          this.notify.dismissLoader();
          let response: any = res ? JSON.parse(res) : 'error';
          if (response && response.success) {
            this.inspection = response.inspection;
            console.log('res', this.inspection);
          } else {
            this.notify.simpleTimeToast('Results not loaded');
          }
        }
        console.log('res', this.inspection);
      },
        err => {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast(err);
        }
      );
      // 
    this.storage.get('userCar').then(car => {
      this.car = car;
      console.log('car', this.car);
    });
  }


  backToPreviousPage() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionResultPage');
  }

}
