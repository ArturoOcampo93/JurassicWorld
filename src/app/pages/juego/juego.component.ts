import { Component, OnInit } from '@angular/core';
import  listaPreguntas from 'src/assets/preguntas.json';

import Swal from 'sweetalert2'

interface PREGUNTAS {
    nId: String;
    cPregunta: String;
    cResp1: String;
    cResp2: String;
    cResp3: String;
    cResp4: String;
    cCorrecta:String;
}

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {

  Preguntas: PREGUNTAS[] = listaPreguntas;

  constructor() { }

  ngOnInit(): void {

    console.log(this.Preguntas);
    
  }

}
