import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder, 
    private service: ServicesService,
    private router: Router){}

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
    password:[
      {type: 'required', message:'El campo es requerido'}
    ]
  };

  login(){
    if (this.Formulario_login.invalid) {
      this.Formulario_login.markAllAsTouched();
      return;
    }
    this.service.login(this.Formulario_login.value).subscribe((data:any)=>{
      this.service.guardar_user(data);
      const rolUser=data.id_rol;
      if(rolUser===1){
        this.router.navigate(['/admin-home']);
      }else if(rolUser===2){
        this.router.navigate(['/user-home']);
      }
    },(error)=>{
      console.log('No autorizado');
      
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    // Borrar los datos del usuario del localStorage antes de que la página se cierre
    localStorage.removeItem('user');
  }

}
