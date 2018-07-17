import {Component} from "@angular/core";
import {NavController, LoadingController, ToastController, Platform} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {AddPatientPage} from "../add-patient/add-patient";
import {AuthProvider} from '../../providers/auth/auth';
import {NotificationsProvider} from '../../providers/notifications/notifications';
import {PerformaProvider} from '../../providers/performa/performa';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import {NavController, LoadingController, ToastController, Platform} from "ionic-angular/umd";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the CommonSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-common-search',
  templateUrl: 'common-search.html',
})
export class CommonSearchPage {

  public patients:any;
  constructor(
    public nav: NavController,
    public auth :AuthProvider,
    private storage: Storage,
    public notify : NotificationsProvider,
    public performa : PerformaProvider,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public filez: File,
    public platform:Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommonSearchPage');
  }

  ionViewWillLoad() {
    this.initializeItems();
  }

  initializeItems() {
    this.performa.getAllPatients().then((data:any)=>{
      if(data && data.docs) {
        this.patients  = data.docs;
      } else { 
        this.patients = null;
      }
    });
  }

  selectSearch(patient:any) {
    this.performa.selectedPatient = patient;
    this.nav.pop();
  }
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.patients = this.patients.filter((item):any => {
        console.log('item', item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return (item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } 
    else {
    this.initializeItems();      
    }
  }

}
