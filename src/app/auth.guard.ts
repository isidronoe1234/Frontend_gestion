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
      const allowedAdminRoutes = ['/admin-home'];
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
      return this.router.parseUrl('/home-principal');
   }
}
