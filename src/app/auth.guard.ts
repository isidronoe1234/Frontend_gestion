import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ServicesService } from './services/services.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router, private service: ServicesService) {}

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
   ): boolean | UrlTree {
      const isAuthenticated = this.service.isAuthenticated(); 
      const userData = JSON.parse(localStorage.getItem('user') || 'null') || null;
      const userRole = userData.id_rol;
      const allowedAdminRoutes = ['/admin-home', '/admin-route1', '/admin-route2'];
      const allowedUserRoutes = ['/user-home'];
    
      if (isAuthenticated) {     
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

      // El usuario no está autenticado, redirige al usuario a la página de inicio de sesión
      return this.router.parseUrl('/login'); // Cambia '/login' por la ruta de inicio de sesión
   }
}
