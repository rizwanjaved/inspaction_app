import {Component} from "@angular/core";
import {NavController, LoadingController, ToastController, Platform} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";
import {AuthProvider} from '../../providers/auth/auth';
import {NotificationsProvider} from '../../providers/notifications/notifications';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import {NavController, LoadingController, ToastController, Platform} from "ionic-angular/umd";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';




@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public searches = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  imageURI:any;
  imageFileName:any;
  public registerForm;
  file: File;
  changeListener($event) : void {
    this.file = $event.target.files[0];
    // console.log('file is ', this.file);
    this.uploadFile(this.file)
  }
  constructor(
    public nav: NavController,
    public auth :AuthProvider,
    private storage: Storage,
    public notify : NotificationsProvider,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public filez: File,
    public platform:Platform
  ) {
    this.registerForm = this.fb.group({
      userName :  ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password : ['', Validators.required],
      grade: ['', Validators.required],
      retiredCheck :[false, Validators.required],
      exPersonCheck :[false, Validators.required],
      placeOfWork :['', Validators.required],
      companyLogo :[''],
      clientAddress :['', Validators.required],
      date :['', Validators.required],
      contactNo :['', Validators.required],
    });
    // console.log('all url', target);
  }
  uploadFile(file) {
    console.log('file is ', file)
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
    this.nav.setRoot(LoginPage);
  }
  registerSubmit() {
    let form = this.registerForm.value;
    if(form.password !== form.confirm_password) {
      return false;
    } else {
      this.auth.register(this.registerForm.value)
      .subscribe(res=>{
        this.validateRegister(JSON.parse(res));
        console.log('sub data', res);
      },
      err => {
        this.validateRegister(err);
      }
      );
    }
  }
  validateRegister(response) {
    let msg = "Oops! Unable to register user";
    console.log('res', response);
    if(!response || (response && response.error)){
      this.notify.simpleTimeToast(msg);
    } else {
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
