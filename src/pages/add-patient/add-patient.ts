import {Component} from "@angular/core";
import {NavController, LoadingController, ToastController, Platform} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {PatientsPage} from "../patients/patients";
import {AuthProvider} from '../../providers/auth/auth';
import {NotificationsProvider} from '../../providers/notifications/notifications';
import {PerformaProvider} from '../../providers/performa/performa';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import {NavController, LoadingController, ToastController, Platform} from "ionic-angular/umd";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


/**
 * Generated class for the AddPatientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-patient',
  templateUrl: 'add-patient.html',
})
export class AddPatientPage {

  public searches = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  imageURI:any;
  imageFileName:any;
  public addPtientForm;
  file: File;
  changeListener($event) : void {
    this.file = $event.target.files[0];
    // console.log('file is ', this.file);
    // this.performa.savePatientAttachments(this.file);
  }
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
    this.addPtientForm = this.fb.group({
      firstName     :  ['', Validators.required],
      secondName    :  ['', Validators.required],
      dateOfBirth   :  [''],
      age           :  [''],
      cnic          :  [''],
      contact       :  [''],
      email         :  [''],
      whatsapp      :  [''],
      clientAddress :  [''],
      recordNo      :  [''],
      patientImage   : ['']
    });
    // console.log('all url', target);
    this.performa.getImage();

  }
  uploadFile(file) {
    console.log('file is ', file);
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    let reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
        const bstr = e.target.result;
        console.log('reader ', e);
    };
      
      // console.log('file isss ', );
    // loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
    console.log('zzzz', fileTransfer);
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.notify.simpleTimeToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.notify.simpleTimeToast(err);
    });
  }



  // register and go to home page
  register(res) {
    this.notify.simpleTimeToast('Patinet Aadded successfully ');
    this.nav.pop();
  }
  patientSubmit() {
    let form = this.addPtientForm.value;
    form['user_type'] = "patient";
    form['record_type'] = "user";
    if(this.file) {
      form['user_image'] = true;
    } else {
      form['user_image'] = false;
    }
    this.performa.registerPatients(form, this.file)
    .then((res:any) => {
      this.validateRegister(res);
    });
  }
  validateRegister(response) {
    let msg = "Oops! Unable to register Patiner";
    if(!response || (response && response.error)){
      this.notify.simpleTimeToast(msg);
    } else {
      console.log('reesss', response);
      console.log('reesss id', response.id);
      if(response.id !== undefined && response.id !== null) {
        this.register(response);
      } else {
        this.notify.simpleTimeToast(msg);
      }
    } 
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
