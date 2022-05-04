import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface recuperaUser {
  emailrecupera: string
}


@Injectable({
  providedIn: 'root'
})
export class RecuperaService {

  urlLC: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      //'Authorization': 'Basic ' + btoa('admin:admin'),
    }),
  }

  recuperaUsuarioLC(dataLC: recuperaUser){

    const body = new HttpParams()
      .set('correo', dataLC.emailrecupera)

      return this.http.post(
            `${this.urlLC}/recupera`,
            body.toString(),
            this.httpOptions
          );

  }

}
