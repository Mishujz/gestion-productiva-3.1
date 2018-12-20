import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { FooterComponent } from './footer/footer.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { GaleriaComponent } from './galeria/galeria.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent}
  //{ path: '',component:CabeceraComponent, pathMatch:'full'},//cuando este vacio nuesgtra ruta nos rediriga al nuestro Inicio
  //{ path: '**', redirectTo:'/', pathMatch:'full'}//cualquier ruta que sea desconocida que nos dirigia a cualquier ruta que querramos
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CuerpoComponent,
    FooterComponent,
    CabeceraComponent,
    LoginComponent,
    RegistroComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
