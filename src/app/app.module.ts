import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Components_home/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeUsuarioComponent } from './components/Usuario/home-usuario/home-usuario.component';
import { HomeAdminComponent } from './components/Administrador/home-admin/home-admin.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { ConvocatoriasComponent } from './components/Components_home/convocatorias/convocatorias.component';
import { ConveniosComponent } from './components/Components_home/convenios/convenios.component';
import { FormatosComponent } from './components/Components_home/formatos/formatos.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUsuarioComponent,
    HomeAdminComponent,
    HomePrincipalComponent,
    ConvocatoriasComponent,
    ConveniosComponent,
    FormatosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
