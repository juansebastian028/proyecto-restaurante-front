import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/pages/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './components/pages/registrarse/registrarse.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    RegistrarseComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
