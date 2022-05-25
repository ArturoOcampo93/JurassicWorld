import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'littleCaesarsBatman';

  constructor(public router: Router, private gtmService: GoogleTagManagerService,) {

    this.router.events.subscribe(event => {
      
      if (event instanceof NavigationEnd) {
              gtag('config', 'UA-52079675-18',
                {
                  'page_path': event.urlAfterRedirects
                }
              );
            }
    
     })
  }

  ngOnInit(): void {
    // push GTM data layer for every visited page
    this.router.events.forEach(item => {
      if (item instanceof NavigationEnd) {
        const gtmTag = {
          event: 'page',
          pageName: item.url
        };

        this.gtmService.pushTag(gtmTag);
      }
    });
  }
}
