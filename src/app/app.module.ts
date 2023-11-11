import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeUsuarioComponent } from './components/Usuario/home-usuario/home-usuario.component';
import { HomeAdminComponent } from './components/Administrador/home-admin/home-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUsuarioComponent,
    HomeAdminComponent,

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
