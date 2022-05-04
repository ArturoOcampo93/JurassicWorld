import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ThankyouPageComponent } from './pages/thankyou-page/thankyou-page.component';
import { MicuentaComponent } from './pages/micuenta/micuenta.component';
import { InstruccionesComponent } from './pages/instrucciones/instrucciones.component';
import { JuegoComponent } from './pages/juego/juego.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { EscribeComponent } from './pages/escribe/escribe.component';
import { GameOverComponent } from './pages/game-over/game-over.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { UploadimageComponent } from './components/uploadimage/uploadimage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    ThankyouPageComponent,
    MicuentaComponent,
    InstruccionesComponent,
    JuegoComponent,
    HeaderComponent,
    FooterComponent,
    EscribeComponent,
    GameOverComponent,
    UploadimageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
