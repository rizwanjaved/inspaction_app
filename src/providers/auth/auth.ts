import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NotificationsProvider } from '../notifications/notifications';
import {HomePage} from "../../pages/home/home";




/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  // public remoteUrl = 'http://25d4e1ce.ngrok.io/';
  public remoteUrl = 'http://192.168.99.6:5985/';
  // public localUrl = 'http://localhost:8000/api/';
  public localUrl = 'http://192.168.0.103:8000/api/';
  public connectionErrorMessage = "Aww! No Connection to the server, Please check internet connection";
  public authStatus; 
  public authIssue;
  public authData;
  public menuButton = "menu";
  constructor(
    public http: Http,  
    private storage: Storage, 
    public notify:NotificationsProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }
  // 
  /******* firebase auth******/
  // 
  login(data): Observable<any> {
    let apiURL = this.localUrl+'login/';
    let options  = this.headers();
    return this.http.post(apiURL,{
      'email': data.email,
      'password': data.password
    }, options)
      .map((res: any) => {
        this.authData = JSON.stringify(res);
        let toReturn: any = res._body;
        console.log('provider login res', toReturn);
        return toReturn;
      })
      .catch((e: any) => {
        this.authIssue = JSON.stringify(e);
        console.log('provider login e', e);
        return Observable.of(e._body);
      })
  }
    headers(token=null) {
      var headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept', 'application/json');
      headers.append('content-type', 'application/json');
      if(token) {
        headers.append('Authorization', 'Bearer '+token);        
      }
      return new RequestOptions({ headers: headers });
    }
}
