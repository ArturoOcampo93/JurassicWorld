import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {this.openPopup()}

  ngOnInit() {}

displayStyle = "none";

openPopup() {
    this.displayStyle = "block";
}
closePopup() {
    this.displayStyle = "none";
    $('#videoIframe').attr('src', "none");
    
}
}
