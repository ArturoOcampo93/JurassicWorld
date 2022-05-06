import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss']
})
export class GameOverComponent implements OnInit {

  correctas:any;
  preguntas:any;

  constructor() { }

  ngOnInit(): void {

    this.correctas=localStorage.getItem("correctas") || '0';
    this.preguntas=localStorage.getItem("preguntas") || '0';

  

  }

}
