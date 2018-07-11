import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  public remoteUrl = 'http://192.168.99.6:5985/'
  constructor(public http: Http) {
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
        let toReturn: any = res._body;
        return toReturn;
      })
      .catch((e: any) => {
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
  register(form): Observable<any> {
    let apiUrl = this.remoteUrl + '_users/org.couchdb.user:' + form.username;
    let formData = new FormData();
    formData.append('name', form.userName);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('grade', form.grade);
    formData.append('retired_check', form.retiredCheck);
    formData.append('ex_person_check', form.exPersonCheck);
    formData.append('place_of_work', form.placeOfWork);
    formData.append('client_address', form.clientAddress);
    formData.append('date', form.date);
    formData.append('contact_no', form.contactNo);
    formData.append('roles', 'user');
    let apiURL = this.remoteUrl + '_session';
    console.log('apiurl', apiUrl);
    return this.http.put(apiURL, {
    })
      .map((res: any) => {
        console.log('sss', res);
        return res;
      })
      .catch((e: any) => {
        console.log('rrrr', e);
        return Observable.of(e);
      })
  }

}
