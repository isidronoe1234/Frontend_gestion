import { Component } from '@angular/core';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent {


  pestanaSeleccionada: string = 'login';

  seleccionarPestana(pestana: string) {
    this.pestanaSeleccionada = pestana;
  }

  cerrarMenu(): void {
    const navBar = document.querySelector('.navbar-collapse');
    if (navBar && navBar.classList.contains('show')) {
      navBar.classList.remove('show');
    }
  }

}
