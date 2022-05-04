import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface registroUser {
  nombreregistro: string
  direccionregistro: string
  estadoregistro: string
  emailregistro: string
  passwordregistro: string
  telefonoregistro: string
  edadregistro: string
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  urlLC: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        //'Authorization': 'Basic ' + btoa('admin:admin'),
      }),
    };


    registraUsuarioLC(dataLC: registroUser){

      const body = new HttpParams()
        .set('nombre', dataLC.nombreregistro)
        .set('direccion', dataLC.direccionregistro)
        .set('estado', dataLC.estadoregistro)
        .set('correo', dataLC.emailregistro)
        .set('password', dataLC.passwordregistro)
        .set('telefono', dataLC.telefonoregistro)
        .set('edad', dataLC.edadregistro);

        return this.http.post(
              `${this.urlLC}/regusr`,
              body.toString(),
              this.httpOptions
            );

    }
}
