import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscribeService {

  urlLC: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      //'Authorization': 'Basic ' + btoa('admin:admin'),
    }),
  }

  enviaHistoria(historia: string){
    const token = localStorage.getItem(environment.tokenVar) || '';

    const body = new HttpParams()
      .set('historia', historia)
      .set('token', token);      

      return this.http.post(
        `${this.urlLC}/historia`,
        body.toString(),
        this.httpOptions
      );

  }
}
