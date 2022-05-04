import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styleUrls: ['./micuenta.component.scss']
})


export class MicuentaComponent implements OnInit {

  recibe:any;
  errorRegistro='';
  nombreImagen = 'No se ha seleccionado ningún archivo';
  @ViewChild('closebutton') closebutton;

  constructor() { }

  ngOnInit(): void {
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

}
