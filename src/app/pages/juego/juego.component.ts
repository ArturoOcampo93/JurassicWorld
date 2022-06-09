import { Component, OnInit, ViewChild } from '@angular/core';
import  listaPreguntas from 'src/assets/preguntas.json';
//import timmmer
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';
import { RegjuegoService,registroPreg } from 'src/app/services/regjuego.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { Md5 } from 'ts-md5/dist/md5';

interface PREGUNTAS {
    nId: number;
    cPregunta: String;
    cCorrecta:String;
    cResp1: String;
    cResp2: String;
    cResp3: String;
    cResp4: String;
}

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {

  respCon=""
  idCon = ""
  detCon = ""
  timeCon = ""
  timeDate= ""

  //preguntas en pantalla
  preguntaMuestra: any;
  numeroPreguntas: number = 40;
  preguntacontestada: number=0;

  //tiempo entre pregunta y pregunta
  tiempoEspera: boolean = true

  //servicio guardar preguntas
  miPart: registroPreg = <registroPreg>{}
  respuesta: any;
  errorPart = "";
  correctas = 0;

  //muestraPreguntas: any;
  //tempPreg: PREGUNTAS[] = [];


  //timer
  @ViewChild('basicTimer') basicTimer

  preguntas: PREGUNTAS[] = listaPreguntas;
  cambioPreg: PREGUNTAS[] = [];

  constructor(private regjuegoService: RegjuegoService, private router:Router) {

    //MD% de todas las respuestas
    /*this.preguntas.forEach(pregunta => {
      let correcta = Md5.hashStr(pregunta.cCorrecta.toString())
      pregunta.cCorrecta = correcta
      this.tempPreg.push(pregunta)
    });

    this.muestraPreguntas = JSON.stringify(this.tempPreg);*/

    for (let index = 0; index < this.numeroPreguntas; index++) {
     let nuevoOrdenPreguntas = new Array();
     //const element = this.Preguntas[index];
     let max = (index+1)*2;
     let min = max-2;
     max--;  

    const element = listaPreguntas[Math.floor((Math.random() * (max - min)) + min)]
    nuevoOrdenPreguntas.push(element.cResp1, element.cResp2, element.cResp3, element.cResp4)
    nuevoOrdenPreguntas.sort(function () { return 0.5 - Math.random() });

    element.cResp1 = nuevoOrdenPreguntas[0]
    element.cResp2 = nuevoOrdenPreguntas[1]
    element.cResp3 = nuevoOrdenPreguntas[2]
    element.cResp4 = nuevoOrdenPreguntas[3]

     this.cambioPreg.push(element);
   }

      //console.log(this.cambioPreg);
      this.preguntaMuestra=this.cambioPreg[0];
  }

  ngOnInit(): void {

    //console.log(this.preguntas);
    
  }


  CambioPregunta(){
    //limpiar preguntaMuestra
    this.preguntaMuestra = ""

    /*if(Number(this.preguntasContastadas) > this.preguntacontestada){
      console.log(`${this.preguntasContastadas} > ${this.preguntacontestada}`);
      this.preguntacontestada = Number(this.preguntasContastadas);
    }else{
      console.log(`${this.preguntasContastadas} > ${this.preguntacontestada}`);

    }*/

    //llenamos preguntaMuestra
    setTimeout(() => {
      this.tiempoEspera = true;
      this.preguntacontestada++;
      this.preguntaMuestra=this.cambioPreg[this.preguntacontestada];
    }, 300)
  }


  //respuestas de preguntas
   RespuestasFormulario(respuesta:string){

    let respuestaUser = Md5.hashStr(respuesta);
    if(respuestaUser == this.preguntaMuestra.cCorrecta){
      this.correctas+=1;
    }
    if (this.tiempoEspera){
      this.tiempoEspera = false;
      let partial = `${this.basicTimer.hours.toString().padStart(2, 0)}:${this.basicTimer.minutes.toString().padStart(2, 0)}:${this.basicTimer.seconds.toString().padStart(2, 0)}`
      //console.log('partial: ', partial);

      if (this.preguntacontestada < 61) {
        this.respCon += respuesta + "|"
        this.idCon += this.preguntaMuestra.nId + "|"
        this.detCon += this.preguntaMuestra.cCorrecta + "|"
        this.timeCon += partial + "|"

        let  d=new Date();
        let  dformat = [d.getMonth()+1,d.getDate(),d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()].join(':');

        this.timeDate += dformat + "|"
        this.CambioPregunta();

      } else {
        this.respCon += respuesta + "|"
        this.idCon += this.preguntaMuestra.nId + "|"
        this.detCon += this.preguntaMuestra.cCorrecta + "|"
        this.timeCon += partial + "|"
        let  d=new Date();
        let  dformat = [d.getMonth()+1,d.getDate(),d.getFullYear()].join('/')+' '+[d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()].join(':');

        this.timeDate += dformat + "|"

        this.miPart.respuestas = this.respCon;
        this.miPart.ids = this.idCon;
        this.miPart.detalles = this.detCon+this.timeDate;
        this.miPart.tiempos = this.timeCon;
        //this.miPart.token = this.token;

        //console.log(this.miPart);
        this.guardaRespuestas();
      }
      
     
    }
   }


   //time coplete
   onComplete(data){
     //console.log(this.miPart);
     //console.log('guarda preguntas');
     this.guardaRespuestas();
   }

   //guarda respuestas
   guardaRespuestas(){
     
     this.miPart.respuestas = this.respCon;
     this.miPart.ids = this.idCon;
     this.miPart.detalles = this.detCon+this.timeDate;
     this.miPart.tiempos = this.timeCon;

      Swal.fire({
        allowOutsideClick: false,
        title: 'Espere por favor...',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      Swal.showLoading();
      this.regjuegoService.participacion(this.miPart, this.preguntacontestada).subscribe(resp => {
          this.basicTimer.stop()
          this.respuesta = resp;
          Swal.close();
          if (this.respuesta.success == "200") {
            //guardo en el localstorge id

            if(Number(this.respuesta.correctas) > this.preguntacontestada){
              this.preguntacontestada = Number(this.respuesta.correctas);
            }

            localStorage.setItem("correctas", this.respuesta.correctas);
            localStorage.setItem("preguntas", this.preguntacontestada.toString());

            Swal.fire({
              allowOutsideClick: false,
              title: 'Bien Hecho',
              icon: 'success',
              text: `Registro correcto`,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#F8671B'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/game-over');
              }
            });

          } else {
            this.errorPart = this.respuesta.error_msg;

            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: this.respuesta.error_msg,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#F8671B'
            });
          }
      });
       
   }

}
