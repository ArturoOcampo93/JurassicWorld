import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegticketService {

  urlLC: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      //'Authorization': 'Basic ' + btoa('admin:admin'),
    }),
  };

  historialUser() {
    const token = localStorage.getItem(environment.tokenVar) || '';
    const body = new HttpParams()
    .set('token', token)
    return this.http.post(
      `${this.urlLC}/consultaHistorial`,
      body.toString(),
      this.httpOptions
    );
  }

  regTicket(nombre:string) {
    const token = localStorage.getItem(environment.tokenVar) || '';

    const body = new HttpParams()
    .set('token', token)
    .set('ticket', nombre);
    return this.http.post(
      `${this.urlLC}/regticket`,
      body.toString(),
      this.httpOptions
    );
  }
}
