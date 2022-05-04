import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap, Observable } from 'rxjs';

export interface loginUser {
  emaillogin: string
  passwordlogin: string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlLC: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      //'Authorization': 'Basic ' + btoa('admin:admin'),
    }),
  }

  loginUsuarioLC(dataLC: loginUser){

    const body = new HttpParams()
      .set('correo', dataLC.emaillogin)
      .set('password', dataLC.passwordlogin)

      return this.http.post(
            `${this.urlLC}/login`,
            body.toString(),
            this.httpOptions
          );

  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem(environment.tokenVar) || ''; 

      const body = new HttpParams()
      .set('token', token)

      return this.http.post(
        `${this.urlLC}/renew`,
        body.toString(),
        this.httpOptions
      ).pipe(
        tap( (resp:any)=>{ //console.log('pipe', resp);
         }),
         map( resp => {
           //console.log('map', resp);
            if(resp.token == true){
              return true;
            }else{
              return false;
            }            
         })
       );
  }

}
