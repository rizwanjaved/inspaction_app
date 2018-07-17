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
 * Generated class for the PatientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {
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

  openPage(page) {
    this.nav.push(AddPatientPage);
  }
  
  ionViewWillLoad() {
    this.performa.getAllPatients().then((data:any)=>{
      if(data && data.docs) {
        this.patients  = data.docs;
      } else { 
        this.patients = null;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientsPage');
   
  }

}