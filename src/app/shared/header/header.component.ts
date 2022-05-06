import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  token:any;

  constructor(private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem(environment.tokenVar) || false;
  }

  CierraSesion() {
    localStorage.setItem(environment.tokenVar, '');
    this.router.navigateByUrl('/home');
    this.token = false;
  }

}
