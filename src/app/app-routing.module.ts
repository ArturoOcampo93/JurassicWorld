import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ThankyouPageComponent } from './pages/thankyou-page/thankyou-page.component';
import { MicuentaComponent } from './pages/micuenta/micuenta.component';
import { InstruccionesComponent } from './pages/instrucciones/instrucciones.component';
import { JuegoComponent } from './pages/juego/juego.component';
import { EscribeComponent } from './pages/escribe/escribe.component';
import { GameOverComponent } from './pages/game-over/game-over.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'thankyou-page', component: ThankyouPageComponent },
  { path: 'micuenta', component: MicuentaComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'juego', component: JuegoComponent },
  { path: 'game-over', component: GameOverComponent },
  { path: 'escribe', component: EscribeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
