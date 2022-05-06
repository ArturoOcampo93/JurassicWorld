import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { RegticketService } from '../../services/regticket.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.scss']
})


export class MicuentaComponent implements OnInit {

  recibe:any;
  respuesta: any;
  errorRegistro='';
  nombreImagen = 'No se ha seleccionado ningún archivo';
  @ViewChild('closebutton') closebutton;
  historial=new Array();

  constructor( private regTicketServ: RegticketService, private router: Router, public formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.mostrarHistorial();
    localStorage.setItem("correctas", '');
    localStorage.setItem("preguntas", '');
  }

  recibeData(respuesta:any){
   this.recibe=respuesta;
   if(this.recibe.status=="ok"){
     this.nombreImagen = this.recibe.nombre;
     this.closebutton.nativeElement.click(); //cerramos modal de foto
     
     Swal.fire({
       allowOutsideClick: false,
       title: 'Espere por favor...',
       icon: 'info',
       confirmButtonText: 'Aceptar',
       confirmButtonColor: '#F8671B'
     });
     Swal.showLoading();

     //registra imagen
    this.regTicketServ.regTicket(this.nombreImagen).subscribe( resp => {
      this.respuesta = resp;
      Swal.close();
      
      if (this.respuesta.success == "200") {
        Swal.fire({
          allowOutsideClick: false,
          title: 'Bien Hecho',
          icon: 'success',
          text: `Registro correcto`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#F8671B'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/instrucciones');
          }
        });
        
     }else{
         this.errorRegistro = this.respuesta.error_msg;

         Swal.fire({
           title: 'Error',
           icon: 'error',
           text: this.respuesta.error_msg,
           confirmButtonText: 'Aceptar',
           confirmButtonColor: '#F8671B'
         });

     }

    })
       
   }else{
     this.errorRegistro = "No se pudo registrar la imagen, intentalo mas tarde.";
     
     Swal.fire({
       title: 'Error',
       icon: 'error',
       text: 'No se pudo registrar la imagen, intentalo mas tarde.',
       confirmButtonText: 'Aceptar',
       confirmButtonColor: '#F8671B'
     });
   }
  }

  mostrarHistorial(){
    this.regTicketServ.historialUser().subscribe(datos=>{
      //console.log(datos['respuesta']);
     this.historial=datos['respuesta'];
    })
  }
    

}
