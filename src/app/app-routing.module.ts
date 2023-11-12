import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/Administrador/home-admin/home-admin.component';
import { AuthGuard } from './auth.guard';
import { HomeUsuarioComponent } from './components/Usuario/home-usuario/home-usuario.component';
import { LoginComponent } from './components/Components_home/login/login.component';
import { HomePrincipalComponent } from './components/home-principal/home-principal.component';

const routes: Routes = [
  { path: '', redirectTo: 'home-principal', pathMatch: 'full' }, // Redirigir al login por defecto
  { path: 'admin-home', component: HomeAdminComponent, canActivate: [AuthGuard] }, // Ruta del home del Administrador
  { path: 'user-home', component: HomeUsuarioComponent, canActivate: [AuthGuard] }, // Ruta del home del Usuario
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home-principal' }, // Redirigir a login en caso de rutas no existente
  { path: 'home-principal', component: HomePrincipalComponent} //Ruta del home principal
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
