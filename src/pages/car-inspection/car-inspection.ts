import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ApiProvider } from '../../providers/api/api';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { HomePage } from "../home/home";




/**
 * Generated class for the CarInspectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-car-inspection',
  templateUrl: 'car-inspection.html',
})
export class CarInspectionPage {
  public carInspectionForm;
  appointment;
  user;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb: FormBuilder, 
    private storage: Storage,
    public api: ApiProvider,
    public notify: NotificationsProvider,
    ) {
    this.carInspectionForm = this.fb.group({
      result: ['', Validators.required],
      location: ['', Validators.required],
      details: ['', Validators.required]
    });
  }

  doCarInspection() {
    let data:any = {};
    data.appointment_id = this.appointment.id;
    data.inspected_by = this.user.id;
    data.car_id = this.appointment.car.id;
    data.inspection_date = new Date().toLocaleString();
    let fData = Object.assign(data,this.carInspectionForm.value);
    this.notify.presentLoader('Processing Inspection');
    this.api.postData(fData, 'postInspection')
      .subscribe(res => {
        if (res && res.type && res.type == 'error') {
          this.notify.dismissLoader();
          this.notify.simpleTimeToast('Some error occured');
        } else {
          this.notify.dismissLoader();
          let response: any = res ? JSON.parse(res) : 'error';
          if(response && response.success) {
            this.notify.simpleTimeToast('The inspection results are added Successfully');
            this.navCtrl.setRoot(HomePage);
          } else {
            this.notify.simpleTimeToast('Inspection Result not added OR Inspection already Added');
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
    console.log('ionViewDidLoad CarInspectionPage', this.navParams.get('appointment'));
  }
  ionViewDidEnter() {
    this.appointment = this.navParams.get('appointment');
    this.storage.get('userData').then(user => {
      this.user = user;
    })
  }

}
