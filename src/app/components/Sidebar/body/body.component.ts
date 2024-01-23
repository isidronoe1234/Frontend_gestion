import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceLoginService } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @Input() collapsed= false;
  @Input() screenWidth=0;
  showSidenav: boolean = false;
  isAuthenticated: any = [];
  userRole: any = [];

  constructor(private router: Router, private loginService: ServiceLoginService) {
    this.mostrarSidenav();
  }

  getBodyClass():string{
    let styleClass='';
    if(this.collapsed && this.screenWidth>768){
      styleClass='body-trimmed';

    }else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth>0){
      styleClass='body-md-screen'
    }
    return styleClass;
  }

  async mostrarSidenav() {
    try {
      this.isAuthenticated = await this.loginService.isAuthenticated();
      this.userRole = this.isAuthenticated.id_rol;
      console.log(this.userRole);
      if (this.isAuthenticated && this.userRole === 1) {
        this.showSidenav = true;
      } else {
        this.showSidenav = false;
      }

    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
    }
  }

}
