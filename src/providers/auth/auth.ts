import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { PerformaProvider } from '../performa/performa';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  // public remoteUrl = 'http://25d4e1ce.ngrok.io/';
  public remoteUrl = 'http://192.168.99.6:5985/';
  public connectionErrorMessage = "Aww! No Connection to the server, Please check internet connection";
  public authStatus; 
  public authIssue;
  public authData;
  constructor(public http: Http,  private storage: Storage, public performa: PerformaProvider) {
    console.log('Hello AuthProvider Provider');
  }
  // 
  login(data): Observable<any> {
    let apiURL = this.remoteUrl + '_session';
    return this.http.post(apiURL, {
      'name': data.email,
      'password': data.password
    })
      .map((res: any) => {
        console.log('provider login res', res);
        this.authData = JSON.stringify(res);
        let toReturn: any = res._body;
        return toReturn;
      })
      .catch((e: any) => {
        this.authIssue = JSON.stringify(e);
        console.log('provider login e', e);
        return Observable.of(e._body);
      })
  }
  //
  logout(): Observable<any> {
    let apiURL = this.remoteUrl + '_session';
    return this.http.delete(apiURL, {
    })
      .map((res: any) => {
        return res;
      })
      .catch((e: any) => {
        return Observable.of(e);
      })
  }
  //
  register(form, file) {
    let apiUrl = this.remoteUrl + '_users/org.couchdb.user:' + form.userName;
    let data:any = {
      "name": form.userName,
      'email': form.email,
      'password': form.password,
      "roles": [],
      "type": "user",
      'grade': form.grade,
      'retired_check': form.retiredCheck,
      'ex_person_check': form.exPersonCheck,
      'place_of_work': form.placeOfWork,
      'client_address': form.clientAddress,
      'date': form.date,
      'contact_no': form.contactNo,
      'user_type': 'doctor'
    }
    let heads:any = new Headers();
    heads.append('Content-Type', 'application/json');  
    return this.http.put(apiUrl,data,{headers: heads})
    .map((res: any) => {
      let toReturn: any = JSON.parse(res._body);
      if (toReturn.id !== undefined && toReturn.id !== null) {
        this.performa.registerDoctors(data,file).then((doc)=>{
          toReturn.attached_user = doc;
          console.log('register map ', toReturn);
          debugger;
          // return toReturn;
        });
      }
    })
    .catch((e: any) => {
      console.log('register error ', e);
      return Observable.of(e._body);
    })
  }
  checkAuth() {
    this.storage.get('user').then(data => {
      if (data || data.name !== null) {
        this.authStatus  = true;
        return true;
      } else {
        this.authStatus  = false;
        return false;
      }
    });
  }

}
