import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { HomePage } from "../home/home";


/**
 * Generated class for the ContraventionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contravention',
  templateUrl: 'contravention.html',
})
export class ContraventionPage {
  public contraventionForm;
  user;
  car;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    private storage: Storage,
    public api: ApiProvider,
    public notify: NotificationsProvider,
  ) {
    this.contraventionForm = this.fb.group({
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ionViewDidEnter() {
    // this.appointment = this.navParams.get('appointment');
    this.storage.get('userData').then(user => {
      this.user = user;
    });
    this.storage.get('userCar').then(car => {
      this.car = car;
    })
  }

  payContravention() {
    let data: any = {};
    data.car_id = this.car.id;
    data.fee = this.contraventionForm.value.amount;
    data.description = this.contraventionForm.value.description;
    this.notify.presentLoader('Processing Conravention');
    this.api.postData(data, 'contravention')
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast('Some error occured');
        } else {
          this.notify.dismissLoader();
          let response: any = res ? JSON.parse(res) : 'error';
          if (response && response.success) {
            this.notify.simpleTimeToast('The Contravention is Submitted Successfully');
            this.navCtrl.setRoot(HomePage);
          } else {
            this.notify.simpleTimeToast('Contvention not Added');
          }
          console.log('inspection Page Form', response);
        }
      },
        err => {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast(err);
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContraventionPage');
  }

}
