import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceLoginService } from 'src/app/services/service-login.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})

export class SidenavComponent {

  rol_user: any = "";
  user_admin: any = {};
  id_rol: any = {};
  sidenav: any = false;
  nombre: any = "";
  datos_perfil: any = [];
  id: any;
  foto_perfil: any = "";
  showSidenav: boolean = false;
  isAuthenticated: any = [];
  userRole: any = [];


  constructor(private router: Router, private loginService: ServiceLoginService) {
    this.mostrarSidenav();
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }


  cerrarSesion(): void {
    Swal.fire({
      title: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: 'Cerrando sesión...',
          icon: 'info',
          showCancelButton: false,
          showConfirmButton: false
        })
        setTimeout(() => {
          this.router.navigateByUrl('/home-principal')
          Swal.fire('Sesión cerrada', '', 'success');
        }, 2000);

      }
    });
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
