
import 'rxjs/add/operator/map';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NavController, AlertController, ToastController, MenuController } from "ionic-angular";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { NotificationsProvider } from '../notifications/notifications';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  public localUrl = 'http://localhost:8000/api/';
  public connectionErrorMessage = "Aww! No Connection to the server, Please check internet connection";
  public menuButton = "menu";
  public access_token;
  constructor(
    public http: Http,
    private storage: Storage,
    public notify: NotificationsProvider
  ) {
    console.log('Hello AuthProvider Provider');
    this.storage.get('accessToken').then(token=>{
      this.access_token = token;
    });
  }

 
  postData(data = null, url): Observable<any> {
    let apiURL = this.localUrl+url;
    let options  = this.headers(this.access_token);
    return this.http.post(apiURL,data, options)
      .map((res: any) => {
        // this.authData = JSON.stringify(res);
        let toReturn: any = res._body;
        console.log('provider postService', toReturn);
        return toReturn;
      })
      .catch((e: any) => {
        // this.authIssue = JSON.stringify(e);
        console.log('provider login e', e);
        return Observable.of(e._body);
      })
  }
  headers(token) {
    var headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    // headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + token);
    return new RequestOptions({ headers: headers });
  }


}
