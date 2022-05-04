import { Component, OnInit } from '@angular/core';
import { EscribeService } from '../../services/escribe.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-escribe',
  templateUrl: './escribe.component.html',
  styleUrls: ['./escribe.component.scss']
})
export class EscribeComponent implements OnInit {

  //Declaramos el FormGroup de registroForm
  historiaForm:FormGroup;
  isSubmitReg:Boolean=false;
  respuesta: any;

  constructor( private escribeService: EscribeService, private router: Router, public formBuilder:FormBuilder) { 

    //formulrio de RECUPERA
    this.historiaForm = this.formBuilder.group({
      historiaCuentanos:['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ 0-9#-.,:;?¡¿!\n]*')]],
    }); 

  }

  ngOnInit(): void {
  }

  escribeHistoria(){

    this.isSubmitReg=true;
    if(this.historiaForm.valid){
      //loading
      Swal.fire({
        allowOutsideClick: false,
        title: 'Espere por favor...',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      Swal.showLoading();
      //envia data
      this.escribeService.enviaHistoria(this.historiaForm.value['historiaCuentanos'] ).subscribe(resp =>{
        this.respuesta = resp;
        Swal.close();

        if(this.respuesta.success=='200'){

       Swal.fire({
         allowOutsideClick: false,
         title: 'Registro correcto.',
         icon: 'success',
         text: `Muchas felicidades tu historia se registro correctamente.`,
         confirmButtonText: 'Aceptar',
         confirmButtonColor: '#F8671B'
       }).then((result) => {
         if (result.isConfirmed) {
           this.router.navigateByUrl('/micuenta');
         }
       });

     }else{

       Swal.fire({
         title: 'Error',
         icon: 'error',
         text: this.respuesta.error_msg,
         confirmButtonText: 'Aceptar',
         confirmButtonColor: '#F8671B'
       });

     }


      })
    }
  }

}
