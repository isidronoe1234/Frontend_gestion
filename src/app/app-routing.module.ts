import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeUsuarioComponent } from './components/Usuario/home-usuario/home-usuario.component';
import { LoginComponent } from './components/Components_home/login/login.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';
import { AgremiadosComponent } from './components/Administrador/agremiados/agremiados.component';
import { SolicitudesComponent } from './components/Administrador/solicitudes/solicitudes.component';
import { AgremiadosArchivadosComponent } from './components/Administrador/agremiados-archivados/agremiados-archivados.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-principal', pathMatch: 'full' },
  { path: 'user-home', component: HomeUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'home-principal', component: HomePrincipalComponent },
  { path: 'list-agremiados', component: AgremiadosComponent, canActivate: [AuthGuard] },
  { path: 'list-solicitudes', component: SolicitudesComponent, canActivate: [AuthGuard] },
  { path: 'agremiados-archivados', component: AgremiadosArchivadosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home-principal' },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
