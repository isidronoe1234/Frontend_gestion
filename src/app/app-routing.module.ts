import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './components/Administrador/home-admin/home-admin.component';
import { AuthGuard } from './auth.guard';
import { HomeUsuarioComponent } from './components/Usuario/home-usuario/home-usuario.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir al login por defecto
  { path: 'admin-home', component: HomeAdminComponent, canActivate: [AuthGuard] }, // Ruta de Administrador
  { path: 'user-home', component: HomeUsuarioComponent, canActivate: [AuthGuard] }, // Ruta de Usuario
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' } // Redirigir a login en caso de rutas no coincidentes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
