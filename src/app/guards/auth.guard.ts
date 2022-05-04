import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  respToken: Boolean = false;

  constructor(private loginService:LoginService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      /*this.loginService.validarToken().subscribe(resp =>{
        console.log('resp: ', resp);
        
      })
      console.log('paso por canactivate');*/
      
    return this.loginService.validarToken().pipe(
      tap( autenticado =>{
        if(!autenticado){
          this.router.navigateByUrl('/home');
        }
      })
    );
  }
  
}
