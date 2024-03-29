import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ServiceLoginService } from './services/service-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: ServiceLoginService) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const isAuthenticated = await this.loginService.isAuthenticated();
      
      if (isAuthenticated) {
        const userData = await this.loginService.isAuthenticated();
        const userRole = userData.id_rol;
        const allowedAdminRoutes = ['/admin-home','/list-agremiados','/list-solicitudes','/agremiados-archivados'];
        const allowedUserRoutes = ['/user-home'];

        if (userRole == 1) {
          if (allowedAdminRoutes.some(route => state.url.startsWith(route))) {
            return true;
          }
        } else if (userRole == 2) {
          if (allowedUserRoutes.some(route => state.url.startsWith(route))) {
            return true;
          }
        }
      }
      return this.router.navigate(['/home-principal']);
    } catch (error) {
      console.error(error);
      return this.router.navigate(['/home-principal']);
    }
  }
}







