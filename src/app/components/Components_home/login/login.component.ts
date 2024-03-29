import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceLoginService } from 'src/app/services/service-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private loginService: ServiceLoginService,
    private router: Router) { }

  Formulario_login: FormGroup = this.fb.group({
    NUE: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[a-zA-Z0-9]+")]],
    password: ['', [Validators.required]],
  }
  );

  validationMessages = {
    NUE: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    password: [
      { type: 'required', message: 'El campo es requerido' }
    ]
  };

  login() {
    if (this.Formulario_login.invalid) {
      this.Formulario_login.markAllAsTouched();
      return;
    }
    this.loginService.login(this.Formulario_login.value).subscribe((data: any) => {
      this.loginService.guardar_user(data);
      const rolUser = data.id_rol;
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Se iniciado sesión correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      setTimeout(() => {
        if (rolUser === 1) {
          this.router.navigate(['/list-agremiados']);
        } else if (rolUser === 2) {
          this.router.navigate(['/user-home']);
        }
      }, 2000);


    }, (error) => {
      Swal.fire({
        title: 'Credenciales incorrectas',
        text: 'Tu NUE y/o constraseñas son incorrectas',
        icon: 'error',
        showConfirmButton: true
      });

    })
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    localStorage.removeItem('user');
  }

}
