import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService,registroUser } from 'src/app/services/registro.service';
import { LoginService,loginUser } from 'src/app/services/login.service';
import { RecuperaService,recuperaUser } from 'src/app/services/recupera.service';
import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  inputType = 'password';
  inputEye = 'assets/images/hide.png';

  //Declaramos el FormGroup de registroForm
  registroForm:FormGroup;
  isSubmitReg:Boolean=false;
  respuesta: any;

  //Declaramos el FormGroup de loginForm
  loginForm:FormGroup;
  isSubmitLogin:Boolean=false;  //para identificar que hizo submit en el boton
  miLoginLC: loginUser = <loginUser>{};
  respuestaLogin: any;
 
  //servicio
  miUsuario: registroUser = <registroUser>{  }
  errorRegistro = "";

  //servicio
  miLogin: loginUser = <loginUser>{  }
  errorLogin = "";

  recuperaForm:FormGroup;
  miRecuperaLC: recuperaUser = <recuperaUser>{  }
  errorRecupera = "";
  isSubmitRecupera:Boolean = false;
  respuestaRecupera: any;

  constructor(private router: Router, public formBuilder:FormBuilder, public registroService:RegistroService, private loginUserLC: LoginService, private recuperaService: RecuperaService) { 
    
    //formulario REGISTRO
    this.registroForm = this.formBuilder.group({
      nombreregistro:['', [Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóúÑñ]*')]],
      direccionregistro:['', [Validators.required,Validators.minLength(4),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóúñÑ # - ., 0-9]*')]],
      estadoregistro:['', [Validators.required,  Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú ]*')]],
      emailregistro:['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      passwordregistro:['', [Validators.required,Validators.minLength(4),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú 0-9]*')]],
      telefonoregistro:['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      edadregistro:['', [Validators.required,Validators.pattern('[0-9]*')]],
      terminos:['', [Validators.required]],
      aviso:['', [Validators.required]]
    });

    //formulrio de LOGIN
    this.loginForm = this.formBuilder.group({
      emaillogin:['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      passwordlogin:['', [Validators.required,Validators.minLength(4),Validators.maxLength(100),Validators.pattern('[a-z A-Z ÁÉÍÓÚ áéíóú 0-9]*')]],
    });

    //formulrio de RECUPERA
    this.recuperaForm = this.formBuilder.group({
      emailrecupera:['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
    }); 
    
  }

  registrousr(){

 //console.log(this.registroForm);
 this.isSubmitReg=true;
 if(this.registroForm.valid){
   //console.log('El registro es válido.')  
   Swal.fire({
     allowOutsideClick: false,
     title: 'Espere por favor...',
     icon: 'info',
     confirmButtonText: 'Aceptar'
   });
   Swal.showLoading();
   //mandar llamar a los servidor, procesar la informacion y esperar el regreso

   this.miUsuario=this.registroForm.value;

   this.registroService.registraUsuarioLC(this.miUsuario).subscribe(finGdr=>{
     //console.log(finGdr);
     this.respuesta=finGdr;
     Swal.close();

     if(this.respuesta.success=='200'){
       //guardar datos en el localstorage
       //guardo en el localstorge id
       localStorage.setItem(environment.tokenVar, this.respuesta.token);

       Swal.fire({
         allowOutsideClick: false,
         title: 'Registro correcto.',
         icon: 'success',
         text: `Ahora ya puedes participar.`,
         confirmButtonText: 'Aceptar',
         confirmButtonColor: '#F8671B'
       }).then((result) => {
         if (result.isConfirmed) {
           this.router.navigateByUrl('/thankyou-page');
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

  ngOnInit(): void {
    console.log(environment.tokenVar);    
  }


   //LOGIN USER
   loginusr(){
    this.isSubmitLogin=true;
    if(this.loginForm.valid){
      //console.log('Estamos validando su usuario...')  
      Swal.fire({
        allowOutsideClick: false,
        title: 'Espere por favor...',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      Swal.showLoading();

      //this.miRegistroLC=this.registroForm.value;
      //La variable recibe los datos del formulario
      this.miLoginLC=this.loginForm.value;

      //Se llama a la clase, luego a la funcion y se le mandan los datos del formulario del html
      this.loginUserLC.loginUsuarioLC(this.miLoginLC).subscribe(finLogin=>{
        //console.log(finLogin);
        this.respuestaLogin=finLogin;
        Swal.close();

        //la respuesta del REST
        if(this.respuestaLogin.success=='200'){
          //guardar datos en el localstorage
          //guardo en el localstorge id
          localStorage.setItem(environment.tokenVar, this.respuestaLogin.token);

          Swal.fire({
            allowOutsideClick: false,
            title: 'Bienvenido',
            icon: 'success',
            text: `Login correcto`,
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
            text: this.respuestaLogin.error_msg,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F8671B'
          });

        }

      })


    }
  }


  //RECUPERA USER
  recuperausr(){
    this.isSubmitRecupera=true;
    if(this.recuperaForm.valid){
      //console.log('Estamos validando su usuario...')  
      Swal.fire({
        allowOutsideClick: false,
        title: 'Espere por favor...',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      Swal.showLoading();

            //La variable recibe los datos del formulario
      this.miRecuperaLC=this.recuperaForm.value;

      //Se llama a la clase, luego a la funcion y se le mandan los datos del formulario del html
      this.recuperaService.recuperaUsuarioLC(this.miRecuperaLC).subscribe(finRecupera=>{
        console.log(finRecupera);
        this.respuestaRecupera=finRecupera;
        Swal.close();

        //la respuesta del REST
        if(this.respuestaRecupera.success=='200'){
          //guardar datos en el localstorage
          //guardo en el localstorge id

          Swal.fire({
            allowOutsideClick: false,
            title: 'Recuperando usuario',
            icon: 'success',
            text: `Se envió la contraseña al correo proporcionado.`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F8671B'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/home');
            }
          });

        }else{

          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: this.respuestaRecupera.error_msg,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F8671B'
          });

        }

      })

    }
  }


  muestraPass(){    

    if(this.inputType == 'password'){
      this.inputType = 'text';
      this.inputEye = 'assets/images/show.png';
    }else{
      this.inputType = 'password';
      this.inputEye = 'assets/images/hide.png';
    }

  }

}
