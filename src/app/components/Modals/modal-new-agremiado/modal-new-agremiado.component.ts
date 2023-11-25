import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServiceAlertasService } from 'src/app/services/service-alertas.service';
import { ServiceModalService } from 'src/app/services/service-modal.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-new-agremiado',
  templateUrl: './modal-new-agremiado.component.html',
  styleUrls: ['./modal-new-agremiado.component.css']
})
export class ModalNewAgremiadoComponent {


  constructor(private service: ServicesService, private fb: FormBuilder, private alertService: ServiceAlertasService, private modalService:ServiceModalService) {
}

  sololetras = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$';
  sololetras_y_numeros = '^[a-zA-Z0-9]+$';
  solonumeros = '^[0-9]+$';

  Formulario_add_agremiado: FormGroup = this.fb.group({
    a_paterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(this.sololetras)]],
    a_materno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern(this.sololetras)]],
    nombre: ['', [Validators.required, Validators.min(3), Validators.maxLength(20), Validators.pattern(this.sololetras)]],
    sexo: ['', [Validators.required]],
    NUP: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.sololetras_y_numeros)]],
    NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.sololetras_y_numeros)]],
    NSS: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.solonumeros)]],
    RFC: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13), Validators.pattern(this.sololetras_y_numeros)]],
    f_nacimiento: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.solonumeros)]],
    cuota: ['', [Validators.required]],
  }
  );

  Mensajes_validaciones = {
    a_paterno: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 15 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 3 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras' },
    ],
    a_materno: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 15 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 3 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras' },
    ],
    nombre: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 20 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 3 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras' },
    ],
    sexo: [
      { type: 'required', message: 'El campo es requerido' },
    ],
    NUP: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    NUE: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    NSS: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 11 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 11 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener números' },
    ],
    RFC: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 13 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 13 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener letras y/o números' },
    ],
    f_nacimiento: [
      { type: 'required', message: 'El campo es requerido' }
    ],
    telefono: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'maxlength', message: 'El campo debe tener un máximo de 10 caracteres' },
      { type: 'minlength', message: 'El campo debe tener un minimo de 10 caracteres' },
      { type: 'pattern', message: 'El campo debe solo contener números' },
    ],
    cuota: [
      { type: 'required', message: 'El campo es requerido' }
    ]
  };

  add_agremiado() {
    if (this.Formulario_add_agremiado.invalid) {
      this.Formulario_add_agremiado.markAllAsTouched();
      return;
    }
    console.log(this.Formulario_add_agremiado.value);
    this.service.newAgremiado(this.Formulario_add_agremiado.value).subscribe((data: any) => {
      this.service.setNewAgremiado(data);
      this.Formulario_add_agremiado.reset();
      this.alertService.generateAlert({
        title: 'Operación exitosa', text: 'Se ha registrado correctamente el usuario', icon: 'success', showConfirmButton: true
      }
      )

    }, (error) => {
      this.alertService.generateAlert({
        title: 'Fallo en la operación', text: 'Ha ocurrido un error al registrar al usuario', icon: 'error', showConfirmButton: true
      })

    })
  }

  cerrarModal(){
    this.modalService.closeModal();
  }
}
