import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController, Platform } from "ionic-angular";
import { LoginPage } from "../login/login";
import { HomePage } from "../home/home";
import { AuthProvider } from '../../providers/auth/auth';
import { NotificationsProvider } from '../../providers/notifications/notifications';
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
  imageURI: any;
  imageFileName: any;
  public registerForm;
  file: File;
  changeListener($event): void {
    this.file = $event.target.files[0];
    // console.log('file is ', this.file);
    this.uploadFile(this.file)
  }
  constructor(
    public nav: NavController,
    public auth: AuthProvider,
    private storage: Storage,
    public notify: NotificationsProvider,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer,
    public image: File,
    public platform: Platform
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      email: [''],
      grade: [''],
      retiredCheck: [false],
      exPersonCheck: [false],
      placeOfWork: [''],
      qualification: [''],
      degree: [''],
      companyLogo: [''],
      clientAddress: [''],
      date: [''],
      contactNo: [''],
    });
    // console.log('all url', target);
  }
  uploadFile($event) {
    this.image = $event.target.value[0];
    console.log('file is', this.image);
  }



  // register and go to home page
  register(res) {
    this.nav.setRoot(LoginPage);
  }
  registerSubmit() {
    let form = this.registerForm.value;
    if (form.password !== form.confirm_password) {
      return false;
    } else {
      this.auth.register(this.registerForm.value, this.image)
        .subscribe(res => {
          console.log('go nawaz', res);
          if (res.type && res.type == 'error') {
            this.validateRegister('error');
          } else {
            this.validateRegister(JSON.parse(res));
          }
        },
          err => {
            this.validateRegister(err);
          }
        );
    }
  }
  validateRegister(response) {
    let msg;
    msg = "Error registering user";
    if (response == 'error') {
      msg = this.auth.connectionErrorMessage;
    }
    if (!response || (response && response.error)) {
      this.notify.simpleTimeToast(msg);
    } else {
      if (response.id !== undefined && response.id !== null) {
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
