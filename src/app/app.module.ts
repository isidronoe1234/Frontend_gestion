import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Components_home/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeUsuarioComponent } from './components/Usuario/home-usuario/home-usuario.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { ConvocatoriasComponent } from './components/Components_home/convocatorias/convocatorias.component';
import { ConveniosComponent } from './components/Components_home/convenios/convenios.component';
import { FormatosComponent } from './components/Components_home/formatos/formatos.component';
import { BodyComponent } from './components/Sidebar/body/body.component';
import { SidenavComponent } from './components/Sidebar/sidenav/sidenav.component';
import { AgremiadosComponent } from './components/Administrador/agremiados/agremiados.component';
import { ModalNewAgremiadoComponent } from './components/Modals/modal-new-agremiado/modal-new-agremiado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SolicitudesComponent } from './components/Administrador/solicitudes/solicitudes.component';
import { AgremiadosArchivadosComponent } from './components/Administrador/agremiados-archivados/agremiados-archivados.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditAgremiadoComponent } from './components/Modals/modal-edit-agremiado/modal-edit-agremiado.component';
import { HomePrincipalAgremiadoComponent } from './components/Components_home/home-principal-agremiado/home-principal-agremiado.component';
import { ModalNewSolicitudComponent } from './components/Modals/modal-new-solicitud/modal-new-solicitud.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUsuarioComponent,
    HomePrincipalComponent,
    ConvocatoriasComponent,
    ConveniosComponent,
    FormatosComponent,
    BodyComponent,
    SidenavComponent,
    AgremiadosComponent,
    ModalNewAgremiadoComponent,
    SolicitudesComponent,
    AgremiadosArchivadosComponent,
    ModalEditAgremiadoComponent,
    HomePrincipalAgremiadoComponent,
    ModalNewSolicitudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,   
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
