import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface registroPreg {
  token: string
  respuestas: string
  ids: string
  detalles: string
  tiempos: string
}

@Injectable({
  providedIn: 'root'
})
export class RegjuegoService {

  urlLC: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'Authorization': 'Basic ' + btoa('admin:admin'),
      }),
    };
    participacion(mipart:registroPreg, preguntas:any) {
      const token = localStorage.getItem(environment.tokenVar) || '';

      const body = new HttpParams()
        .set('token', token)
        .set('resps', mipart.respuestas)
        .set('ids', mipart.ids)
        .set('dets', mipart.detalles)
        .set('preguntas', preguntas)
        .set('tems', mipart.tiempos);


      return this.http.post(
        `${this.urlLC}/regpart`,
        body.toString(),
        this.httpOptions
      );
    }
  }
